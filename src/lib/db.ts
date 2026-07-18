import fs from "fs";
import path from "path";
import { supabase } from "./supabase";

export interface Booking {
  id: string;
  customerName: string;
  mobileNumber: string;
  emailAddress: string;
  city: string;
  weddingDate: string;
  weddingVenue?: string;
  packageSelected: string;
  totalPrice?: number;
  amountPaid: number;
  remainingBalance?: number;
  paymentId?: string; // Optional because it doesn't exist when PENDING
  orderId: string;
  bookingTime: string;
  status?: "PENDING" | "CONFIRMED"; // New field to track payment state
}

const DB_DIR = process.env.VERCEL ? "/tmp/data" : path.resolve(process.cwd(), "src/data");
const DB_FILE = path.join(DB_DIR, "bookings.json");

// Ensure database directory and file exist (for fallback)
function ensureDb() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("[Local DB] Failed to ensure database directory/file:", error);
  }
}

export function getLocalBookings(): Booking[] {
  ensureDb();
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data) as Booking[];
  } catch (error) {
    console.error("Error reading bookings DB:", error);
    return [];
  }
}

export async function getBookingById(id: string): Promise<Booking | undefined> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("[Supabase] Error fetching booking:", error.message);
      } else if (data) {
        return data as Booking;
      }
    } catch (err) {
      console.error("[Supabase] Fetch execution failed:", err);
    }
  }

  // Fallback to local DB
  const bookings = getLocalBookings();
  return bookings.find((b) => b.id === id);
}

export async function saveBooking(booking: Booking): Promise<boolean> {
  let supabaseSaved = false;

  if (supabase) {
    try {
      const { error } = await supabase.from("bookings").insert([booking]);

      if (error) {
        console.error("[Supabase] Error saving booking:", error.message);
      } else {
        console.log("[Supabase] Booking saved successfully:", booking.id);
        supabaseSaved = true;
      }
    } catch (err) {
      console.error("[Supabase] Save execution failed:", err);
    }
  }

  // Always save to local JSON file as a local cache/fallback
  ensureDb();
  try {
    const bookings = getLocalBookings();
    
    // Check if booking already exists (for updates)
    const existingIndex = bookings.findIndex((b) => b.id === booking.id || b.orderId === booking.orderId);
    if (existingIndex >= 0) {
      bookings[existingIndex] = booking;
    } else {
      bookings.push(booking);
    }
    
    fs.writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2), "utf-8");
    console.log("[Local DB] Booking cached successfully.");
    return supabaseSaved || !supabase; // return success true if either Supabase succeeded, or local succeeded when Supabase is not configured
  } catch (error) {
    console.error("[Local DB] Error saving booking:", error);
    return false;
  }
}

export async function updateBookingStatusAndPayment(
  orderId: string,
  paymentId: string,
  status: "PENDING" | "CONFIRMED"
): Promise<Booking | undefined> {
  let updatedBooking: Booking | undefined;

  if (supabase) {
    try {
      // Fetch current booking to return it
      const { data: fetchRes, error: fetchErr } = await supabase
        .from("bookings")
        .select("*")
        .eq("orderId", orderId)
        .maybeSingle();
        
      if (fetchRes) {
        updatedBooking = { ...fetchRes, paymentId, status } as Booking;
        const { error: updateErr } = await supabase
          .from("bookings")
          .update({ paymentId, status })
          .eq("orderId", orderId);
          
        if (updateErr) {
          console.error("[Supabase] Error updating booking status:", updateErr.message);
        } else {
          console.log(`[Supabase] Booking ${orderId} updated to ${status}`);
        }
      }
    } catch (err) {
      console.error("[Supabase] Update execution failed:", err);
    }
  }

  // Fallback / Local sync
  ensureDb();
  try {
    const bookings = getLocalBookings();
    const index = bookings.findIndex((b) => b.orderId === orderId);
    if (index >= 0) {
      bookings[index].paymentId = paymentId;
      bookings[index].status = status;
      fs.writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2), "utf-8");
      if (!updatedBooking) {
        updatedBooking = bookings[index];
      }
    }
  } catch (err) {
    console.error("[Local DB] Error updating booking status:", err);
  }

  return updatedBooking;
}
