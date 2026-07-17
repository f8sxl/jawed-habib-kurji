import fs from "fs";
import path from "path";
import { supabase } from "./supabase";

export interface Booking {
  id: string; // JHKB-XXXXXX
  customerName: string;
  mobileNumber: string;
  emailAddress: string;
  city: string;
  weddingDate: string;
  weddingVenue?: string;
  packageSelected: string;
  amountPaid: number; // in INR (e.g. 2000)
  paymentId: string;
  orderId: string;
  bookingTime: string;
}

const DB_DIR = path.resolve(process.cwd(), "src/data");
const DB_FILE = path.join(DB_DIR, "bookings.json");

// Ensure database directory and file exist (for fallback)
function ensureDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf-8");
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
    bookings.push(booking);
    fs.writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2), "utf-8");
    console.log("[Local DB] Booking cached successfully.");
    return supabaseSaved || !supabase; // return success true if either Supabase succeeded, or local succeeded when Supabase is not configured
  } catch (error) {
    console.error("[Local DB] Error saving booking:", error);
    return false;
  }
}
