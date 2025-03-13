import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import MovieGrid from '../../components/movies/MovieGrid';

interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  releaseDate: string;
  poster: string;
  rating: number;
  duration: string;
  director: string;
  cast: string[];
  trailerUrl?: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const mockMovie: Movie = {
    id: '1',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    genre: ['Action', 'Crime', 'Drama'],
    releaseDate: '2008-07-18',
    poster: 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    rating: 9.0,
    duration: '2h 32m',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine', 'Maggie Gyllenhaal', 'Gary Oldman', 'Morgan Freeman'],
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY'
  };

  const mockReviews: Review[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'John Doe',
      rating: 4.5,
      comment: 'One of the best superhero movies ever made. Heath Ledger\'s performance as the Joker is legendary.',
      date: '2021-08-12'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Jane Smith',
      rating: 5.0,
      comment: 'Christopher Nolan at his best. The pacing, acting, and cinematography are all top-notch.',
      date: '2021-09-03'
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Mike Johnson',
      rating: 4.0,
      comment: 'Great movie, although I think it\'s slightly overrated. Still, Heath Ledger deserved that Oscar.',
      date: '2021-10-21'
    }
  ];

  const mockMovies: Movie[] = [
    {
      id: '2',
      title: 'Inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      genre: ['Action', 'Adventure', 'Sci-Fi'],
      releaseDate: '2010-07-16',
      poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      rating: 8.8,
      duration: '2h 28m',
      director: 'Christopher Nolan',
      cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
      trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0'
    },
    {
      id: '3',
      title: 'Interstellar',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      genre: ['Adventure', 'Drama', 'Sci-Fi'],
      releaseDate: '2014-11-07',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      rating: 8.6,
      duration: '2h 49m',
      director: 'Christopher Nolan',
      cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
      trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E'
    }
  ];

  // Simulate API call to get movie details
  useEffect(() => {
    if (!id) return;

    const timer = setTimeout(() => {
      setMovie(mockMovie);
      setReviews(mockReviews);
      setSimilarMovies(mockMovies);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="bg-gray-300 rounded-lg h-[500px]"></div>
              </div>
              <div className="md:col-span-2">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!movie) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
          <p className="mb-8">The movie you're looking for could not be found.</p>
          <Link href="/movies">
            <Button variant="primary">Back to Movies</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{movie.title} | BigScreenBiz</title>
        <meta name="description" content={movie.description.substring(0, 160)} />
      </Head>

      {/* Movie Hero */}
      <div className="relative pb-[56.25%] h-0 overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.poster})`, opacity: 0.2 }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/70"></div>
        <div className="container mx-auto absolute inset-0 flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="md:col-span-2 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
              <div className="flex flex-wrap items-center mb-4 text-gray-300">
                <span className="mr-3">{formatDate(movie.releaseDate)}</span>
                <span className="mr-3">•</span>
                <span className="mr-3">{movie.duration}</span>
                <span className="mr-3">•</span>
                <span>{movie.genre.join(', ')}</span>
              </div>
              <div className="flex items-center mb-6">
                <div className="bg-purple-600 text-white font-bold rounded-full w-14 h-14 flex items-center justify-center text-xl mr-4">
                  {movie.rating.toFixed(1)}
                </div>
                <span className="text-lg">User Rating</span>
              </div>
              <p className="text-lg mb-8">{movie.description}</p>
              <div className="mb-8">
                <p className="mb-2">
                  <span className="font-semibold">Director:</span> {movie.director}
                </p>
                <p>
                  <span className="font-semibold">Cast:</span> {movie.cast.join(', ')}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href={`/booking/${movie.id}`}>
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    }
                  >
                    Book Tickets
                  </Button>
                </Link>
                <a 
                  href={movie.trailerUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white hover:bg-white hover:text-purple-700"
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  >
                    Watch Trailer
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-12">
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`${
                activeTab === 'reviews'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
            >
              Reviews ({reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('showtime')}
              className={`${
                activeTab === 'showtime'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
            >
              Showtimes
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mb-16">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                <p className="text-gray-600 mb-6">
                  {movie.description}
                </p>
                
                <h2 className="text-2xl font-bold mb-4">Cast & Crew</h2>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Director</h3>
                  <p className="text-gray-600">{movie.director}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cast</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {movie.cast.map((actor, index) => (
                      <div key={index} className="text-gray-600">
                        {actor}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-4">Movie Info</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700">Release Date</h3>
                    <p>{formatDate(movie.releaseDate)}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700">Runtime</h3>
                    <p>{movie.duration}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700">Genre</h3>
                    <p>{movie.genre.join(', ')}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Rating</h3>
                    <p>{movie.rating.toFixed(1)} / 10</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">User Reviews</h2>
                <Button variant="primary" size="sm">
                  Write a Review
                </Button>
              </div>
              
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{review.userName}</h3>
                          <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                        </div>
                        <div className="bg-purple-600 text-white font-bold rounded-full h-10 w-10 flex items-center justify-center">
                          {review.rating}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-600 mb-4">No reviews yet. Be the first to review this movie!</p>
                  <Button variant="primary">Write a Review</Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'showtime' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Showtimes for Today</h2>
              
              <div className="bg-white rounded-lg shadow divide-y">
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-4">Screen 1 - IMAX</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'].map((time, index) => (
                      <Link href={`/booking/${movie.id}?time=${time}`} key={index}>
                        <Button variant="outline" className="w-full">
                          {time}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-4">Screen 2 - Standard</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {['11:30 AM', '2:30 PM', '5:30 PM', '8:30 PM'].map((time, index) => (
                      <Link href={`/booking/${movie.id}?time=${time}`} key={index}>
                        <Button variant="outline" className="w-full">
                          {time}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-4">Screen 3 - 3D</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'].map((time, index) => (
                      <Link href={`/booking/${movie.id}?time=${time}`} key={index}>
                        <Button variant="outline" className="w-full">
                          {time}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Similar Movies */}
        <MovieGrid
          title="Similar Movies You Might Like"
          movies={similarMovies}
        />
      </div>
    </Layout>
  );
} 