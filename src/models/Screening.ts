import mongoose from 'mongoose';

export interface IScreening extends mongoose.Document {
  movie: mongoose.Types.ObjectId;
  theater: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  price: number;
  seatsAvailable: number;
  seatMap: {
    row: string;
    number: number;
    status: 'available' | 'reserved' | 'booked';
    gender?: 'male' | 'female' | null;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ScreeningSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: [true, 'Please provide a movie'],
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater',
      required: [true, 'Please provide a theater'],
    },
    startTime: {
      type: Date,
      required: [true, 'Please provide a start time'],
    },
    endTime: {
      type: Date,
      required: [true, 'Please provide an end time'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    seatsAvailable: {
      type: Number,
      min: [0, 'Seats available cannot be negative'],
    },
    seatMap: [
      {
        row: {
          type: String,
          required: true,
        },
        number: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ['available', 'reserved', 'booked'],
          default: 'available',
        },
        gender: {
          type: String,
          enum: ['male', 'female', null],
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

// Compound index for unique screenings
ScreeningSchema.index({ theater: 1, startTime: 1 }, { unique: true });

// Calculate seats available before saving
ScreeningSchema.pre('save', function (next) {
  if (this.isModified('seatMap')) {
    this.seatsAvailable = this.seatMap.filter(
      (seat) => seat.status === 'available'
    ).length;
  }
  next();
});

// Validate that end time is after start time
ScreeningSchema.pre('validate', function (next) {
  if (this.endTime <= this.startTime) {
    this.invalidate('endTime', 'End time must be after start time');
  }
  next();
});

// Check if model exists before creating a new one (for Next.js hot reloading)
const Screening = mongoose.models.Screening || mongoose.model<IScreening>('Screening', ScreeningSchema);

export default Screening; 