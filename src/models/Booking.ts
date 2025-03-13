import mongoose from 'mongoose';

export interface IBooking extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  screening: mongoose.Types.ObjectId;
  seats: {
    row: string;
    number: number;
    gender?: 'male' | 'female' | null;
  }[];
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  bookingStatus: 'confirmed' | 'cancelled' | 'pending';
  bookingReference: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
    screening: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Screening',
      required: [true, 'Please provide a screening'],
    },
    seats: [
      {
        row: {
          type: String,
          required: true,
        },
        number: {
          type: Number,
          required: true,
        },
        gender: {
          type: String,
          enum: ['male', 'female', null],
          default: null,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, 'Please provide the total amount'],
      min: [0, 'Total amount cannot be negative'],
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    bookingStatus: {
      type: String,
      enum: ['confirmed', 'cancelled', 'pending'],
      default: 'pending',
    },
    bookingReference: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Generate a unique booking reference before saving
BookingSchema.pre('save', async function (next) {
  if (!this.bookingReference) {
    // Generate a random alphanumeric string
    const randomString = Math.random().toString(36).substring(2, 10).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    this.bookingReference = `BK-${randomString}-${timestamp}`;
  }
  next();
});

// Validate that seats array is not empty
BookingSchema.pre('validate', function (next) {
  if (!this.seats || this.seats.length === 0) {
    this.invalidate('seats', 'Please select at least one seat');
  }
  next();
});

// Check if model exists before creating a new one (for Next.js hot reloading)
const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking; 