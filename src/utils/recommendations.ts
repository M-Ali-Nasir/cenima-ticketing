import { IMovie } from '@/models/Movie';
import { IUser } from '@/models/User';
import { IBooking } from '@/models/Booking';
import { Document } from 'mongoose';

// Helper type for plain movie object without Mongoose methods
type PlainMovie = Omit<IMovie, keyof Document>;

interface MovieWithScore extends PlainMovie {
  score: number;
}

/**
 * Generate personalized movie recommendations for a user
 * @param user The user to generate recommendations for
 * @param movies All available movies
 * @param userBookings The user's booking history
 * @returns Array of recommended movies sorted by relevance
 */
export async function generateRecommendations(
  user: IUser,
  movies: IMovie[],
  userBookings: IBooking[]
): Promise<IMovie[]> {
  // Filter out movies that have ended
  const availableMovies = movies.filter(
    (movie) => movie.status !== 'ended'
  );
  
  // Get movies the user has already watched (from bookings)
  const watchedMovieIds = userBookings.map(
    (booking) => booking.screening.toString()
  );
  
  // Get user's watchlist
  const watchlistIds = user.watchlist.map((id) => id.toString());
  
  // Get user's genre preferences from watched movies and watchlist
  const userGenrePreferences = new Map<string, number>();
  
  // Add genres from watched movies with higher weight
  const watchedMovies = movies.filter((movie) => 
    watchedMovieIds.includes(movie._id.toString())
  );
  
  watchedMovies.forEach((movie) => {
    movie.genres.forEach((genre) => {
      const currentWeight = userGenrePreferences.get(genre) || 0;
      userGenrePreferences.set(genre, currentWeight + 2);
    });
  });
  
  // Add genres from watchlist with lower weight
  const watchlistMovies = movies.filter((movie) => 
    watchlistIds.includes(movie._id.toString())
  );
  
  watchlistMovies.forEach((movie) => {
    movie.genres.forEach((genre) => {
      const currentWeight = userGenrePreferences.get(genre) || 0;
      userGenrePreferences.set(genre, currentWeight + 1);
    });
  });
  
  // Score each movie based on user preferences
  const scoredMovies: MovieWithScore[] = availableMovies
    .filter((movie) => !watchedMovieIds.includes(movie._id.toString()))
    .map((movie) => {
      let score = 0;
      
      // Score based on genre preferences
      movie.genres.forEach((genre) => {
        score += userGenrePreferences.get(genre) || 0;
      });
      
      // Boost score for highly rated movies
      score += movie.rating * 0.5;
      
      // Boost score for new releases
      const daysSinceRelease = Math.floor(
        (Date.now() - new Date(movie.releaseDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceRelease < 14) {
        score += (14 - daysSinceRelease) * 0.1;
      }
      
      // Boost score for movies in user's watchlist
      if (watchlistIds.includes(movie._id.toString())) {
        score += 5;
      }
      
      // Convert to plain object and add score
      const plainMovie = {
        title: movie.title,
        description: movie.description,
        posterUrl: movie.posterUrl,
        bannerUrl: movie.bannerUrl,
        trailerUrl: movie.trailerUrl,
        duration: movie.duration,
        releaseDate: movie.releaseDate,
        endDate: movie.endDate,
        genres: movie.genres,
        cast: movie.cast,
        director: movie.director,
        language: movie.language,
        rating: movie.rating,
        reviews: movie.reviews,
        status: movie.status,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
        _id: movie._id,
        score
      };
      
      return plainMovie;
    });
  
  // Sort by score and return top recommendations
  return scoredMovies
    .sort((a, b) => b.score - a.score)
    .map((movie) => {
      // Remove the score property before returning
      const { score, ...movieWithoutScore } = movie;
      return movieWithoutScore as unknown as IMovie;
    });
}

/**
 * Generate similar movies based on a specific movie
 * @param movie The reference movie
 * @param allMovies All available movies
 * @returns Array of similar movies sorted by relevance
 */
export function getSimilarMovies(
  movie: IMovie,
  allMovies: IMovie[]
): IMovie[] {
  // Filter out the reference movie itself
  const otherMovies = allMovies.filter(
    (m) => m._id.toString() !== movie._id.toString()
  );
  
  // Score each movie based on similarity
  const scoredMovies: MovieWithScore[] = otherMovies.map((otherMovie) => {
    let score = 0;
    
    // Score based on shared genres
    const sharedGenres = otherMovie.genres.filter(
      (genre) => movie.genres.includes(genre)
    );
    score += sharedGenres.length * 2;
    
    // Score based on same director
    if (otherMovie.director === movie.director) {
      score += 3;
    }
    
    // Score based on shared cast members
    const sharedCast = otherMovie.cast.filter(
      (actor) => movie.cast.includes(actor)
    );
    score += sharedCast.length;
    
    // Score based on similar release date (within 1 year)
    const movieYear = new Date(movie.releaseDate).getFullYear();
    const otherMovieYear = new Date(otherMovie.releaseDate).getFullYear();
    if (Math.abs(movieYear - otherMovieYear) <= 1) {
      score += 1;
    }
    
    // Convert to plain object and add score
    const plainMovie = {
      title: otherMovie.title,
      description: otherMovie.description,
      posterUrl: otherMovie.posterUrl,
      bannerUrl: otherMovie.bannerUrl,
      trailerUrl: otherMovie.trailerUrl,
      duration: otherMovie.duration,
      releaseDate: otherMovie.releaseDate,
      endDate: otherMovie.endDate,
      genres: otherMovie.genres,
      cast: otherMovie.cast,
      director: otherMovie.director,
      language: otherMovie.language,
      rating: otherMovie.rating,
      reviews: otherMovie.reviews,
      status: otherMovie.status,
      createdAt: otherMovie.createdAt,
      updatedAt: otherMovie.updatedAt,
      _id: otherMovie._id,
      score
    };
    
    return plainMovie;
  });
  
  // Sort by score and return top similar movies
  return scoredMovies
    .filter((movie) => movie.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((movie) => {
      // Remove the score property before returning
      const { score, ...movieWithoutScore } = movie;
      return movieWithoutScore as unknown as IMovie;
    });
} 