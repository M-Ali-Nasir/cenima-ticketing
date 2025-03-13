import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: string;
  title: string;
  genre: string[];
  releaseDate: string;
  poster: string;
  rating: number;
  duration: string;
}

interface MovieGridProps {
  title?: string;
  movies: Movie[];
  loading?: boolean;
  emptyMessage?: string;
}

const MovieGrid = ({ 
  title, 
  movies, 
  loading = false, 
  emptyMessage = "No movies found" 
}: MovieGridProps) => {
  const [mounted, setMounted] = useState(false);

  // This ensures hydration issues are avoided
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="mb-10">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-2">
          {title}
        </h2>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 rounded-lg h-[380px] mb-2"></div>
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              genre={movie.genre}
              releaseDate={movie.releaseDate}
              poster={movie.poster}
              rating={movie.rating}
              duration={movie.duration}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">{emptyMessage}</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieGrid; 