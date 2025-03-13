import mongoose from 'mongoose';

export interface ITheater extends mongoose.Document {
  name: string;
  capacity: number;
  rows: number;
  seatsPerRow: number;
  features: string[];
  status: 'active' | 'maintenance' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const TheaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
      unique: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Please provide the capacity'],
      min: [1, 'Capacity must be at least 1'],
    },
    rows: {
      type: Number,
      required: [true, 'Please provide the number of rows'],
      min: [1, 'Rows must be at least 1'],
    },
    seatsPerRow: {
      type: Number,
      required: [true, 'Please provide the number of seats per row'],
      min: [1, 'Seats per row must be at least 1'],
    },
    features: {
      type: [String],
      default: [],
      enum: ['3D', '4DX', 'IMAX', 'Dolby Atmos', 'VIP', 'Standard'],
    },
    status: {
      type: String,
      enum: ['active', 'maintenance', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Validate capacity matches rows * seatsPerRow
TheaterSchema.pre('validate', function (next) {
  if (this.rows * this.seatsPerRow !== this.capacity) {
    this.invalidate(
      'capacity',
      'Capacity must equal rows * seatsPerRow'
    );
  }
  next();
});

// Check if model exists before creating a new one (for Next.js hot reloading)
const Theater = mongoose.models.Theater || mongoose.model<ITheater>('Theater', TheaterSchema);

export default Theater; 