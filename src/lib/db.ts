import fs from 'fs';
import path from 'path';

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

const DB_DIR = path.resolve(process.cwd(), 'src/data');
const DB_FILE = path.join(DB_DIR, 'bookings.json');

// Ensure database directory and file exist
function ensureDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function getBookings(): Booking[] {
  ensureDb();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data) as Booking[];
  } catch (error) {
    console.error('Error reading bookings DB:', error);
    return [];
  }
}

export function getBookingById(id: string): Booking | undefined {
  const bookings = getBookings();
  return bookings.find(b => b.id === id);
}

export function saveBooking(booking: Booking): boolean {
  ensureDb();
  try {
    const bookings = getBookings();
    bookings.push(booking);
    fs.writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving booking to DB:', error);
    return false;
  }
}
