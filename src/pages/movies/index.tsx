import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import MovieGrid from '../../components/movies/MovieGrid';
import Button from '../../components/ui/Button';

interface Movie {
  id: string;
  title: string;
  genre: string[];
  releaseDate: string;
  poster: string;
  rating: number;
  duration: string;
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data
  const mockMovies = [
    {
      id: '1',
      title: 'The Dark Knight',
      genre: ['Action', 'Crime', 'Drama'],
      releaseDate: '2008-07-18',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      rating: 9.0,
      duration: '2h 32m'
    },
    {
      id: '2',
      title: 'Inception',
      genre: ['Action', 'Adventure', 'Sci-Fi'],
      releaseDate: '2010-07-16',
      poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      rating: 8.8,
      duration: '2h 28m'
    },
    {
      id: '3',
      title: 'Interstellar',
      genre: ['Adventure', 'Drama', 'Sci-Fi'],
      releaseDate: '2014-11-07',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      rating: 8.6,
      duration: '2h 49m'
    },
    {
      id: '4',
      title: 'The Shawshank Redemption',
      genre: ['Drama'],
      releaseDate: '1994-10-14',
      poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      rating: 9.3,
      duration: '2h 22m'
    },
    {
      id: '5',
      title: 'The Godfather',
      genre: ['Crime', 'Drama'],
      releaseDate: '1972-03-24',
      poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      rating: 9.2,
      duration: '2h 55m'
    },
    {
      id: '6',
      title: 'Pulp Fiction',
      genre: ['Crime', 'Drama'],
      releaseDate: '1994-10-14',
      poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      rating: 8.9,
      duration: '2h 34m'
    },
    {
      id: '7',
      title: 'The Lord of the Rings: The Return of the King',
      genre: ['Action', 'Adventure', 'Fantasy'],
      releaseDate: '2003-12-17',
      poster: 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
      rating: 8.9,
      duration: '3h 21m'
    },
    {
      id: '8',
      title: 'The Matrix',
      genre: ['Action', 'Sci-Fi'],
      releaseDate: '1999-03-31',
      poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      rating: 8.7,
      duration: '2h 16m'
    }
  ];

  // Simulate API call to get movies
  useEffect(() => {
    const timer = setTimeout(() => {
      setMovies(mockMovies);
      setFilteredMovies(mockMovies);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Extract all unique genres from movies
  const allGenres = Array.from(new Set(movies.flatMap(movie => movie.genre))).sort();

  // Apply filters when dependencies change
  useEffect(() => {
    if (movies.length === 0) return;

    let result = [...movies];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(term) || 
        movie.genre.some(g => g.toLowerCase().includes(term))
      );
    }

    // Apply genre filter
    if (selectedGenre) {
      result = result.filter(movie => 
        movie.genre.includes(selectedGenre)
      );
    }

    // Apply sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredMovies(result);
  }, [movies, searchTerm, selectedGenre, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSortBy('newest');
  };

  return (
    <Layout>
      <Head>
        <title>Movies | BigScreenBiz</title>
        <meta name="description" content="Browse our collection of movies" />
      </Head>

      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Movies</h1>

          {/* Filters */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title or genre"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Genre Filter */}
              <div>
                <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-700">
                  Genre
                </label>
                <select
                  id="genre"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Genres</option>
                  {allGenres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label htmlFor="sort" className="block mb-2 text-sm font-medium text-gray-700">
                  Sort By
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <MovieGrid
            movies={filteredMovies}
            loading={isLoading}
            emptyMessage="No movies match your search criteria"
          />
        </div>
      </div>
    </Layout>
  );
} 