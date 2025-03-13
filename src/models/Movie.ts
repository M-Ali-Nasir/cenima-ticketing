import mongoose from 'mongoose';

export interface IMovie extends mongoose.Document {
  title: string;
  description: string;
  posterUrl: string;
  bannerUrl: string;
  trailerUrl: string;
  duration: number; // in minutes
  releaseDate: Date;
  endDate: Date;
  genres: string[];
  cast: string[];
  director: string;
  language: string;
  rating: number; // out of 5
  reviews: {
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
  status: 'upcoming' | 'now-showing' | 'ended';
  createdAt: Date;
  updatedAt: Date;
}

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    posterUrl: {
      type: String,
      required: [true, 'Please provide a poster URL'],
    },
    bannerUrl: {
      type: String,
      default: '',
    },
    trailerUrl: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      required: [true, 'Please provide the duration in minutes'],
      min: [1, 'Duration must be at least 1 minute'],
    },
    releaseDate: {
      type: Date,
      required: [true, 'Please provide a release date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide an end date'],
    },
    genres: {
      type: [String],
      required: [true, 'Please provide at least one genre'],
      validate: {
        validator: function (v: string[]) {
          return v.length > 0;
        },
        message: 'Please provide at least one genre',
      },
    },
    cast: {
      type: [String],
      default: [],
    },
    director: {
      type: String,
      required: [true, 'Please provide a director'],
    },
    language: {
      type: String,
      required: [true, 'Please provide a language'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot be more than 5'],
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: [1, 'Rating must be at least 1'],
          max: [5, 'Rating cannot be more than 5'],
        },
        comment: {
          type: String,
          required: true,
          maxlength: [500, 'Comment cannot be more than 500 characters'],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ['upcoming', 'now-showing', 'ended'],
      default: 'upcoming',
    },
  },
  { timestamps: true }
);

// Virtual for average rating
MovieSchema.virtual('averageRating').get(function (this: IMovie) {
  if (this.reviews.length === 0) return 0;
  
  const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
  return sum / this.reviews.length;
});

// Update status based on dates
MovieSchema.pre('save', function (next) {
  const now = new Date();
  
  if (now < this.releaseDate) {
    this.status = 'upcoming';
  } else if (now > this.endDate) {
    this.status = 'ended';
  } else {
    this.status = 'now-showing';
  }
  
  next();
});

// Check if model exists before creating a new one (for Next.js hot reloading)
const Movie = mongoose.models.Movie || mongoose.model<IMovie>('Movie', MovieSchema);

export default Movie; 