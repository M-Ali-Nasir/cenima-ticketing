import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface Movie {
  id: string;
  title: string;
  poster: string;
  duration: string;
  rating: number;
}

interface Showtime {
  id: string;
  movieId: string;
  screen: string;
  time: string;
  date: string;
  format: 'Standard' | 'IMAX' | '3D' | 'VIP';
  availableSeats: number;
}

export default function Schedule() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showtimes, setShowtimes] = useState<Record<string, Showtime[]>>({});
  const [movies, setMovies] = useState<Record<string, Movie>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [datesList, setDatesList] = useState<string[]>([]);

  // Mock data
  const mockMovies: Record<string, Movie> = {
    '1': {
      id: '1',
      title: 'The Dark Knight',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      duration: '2h 32m',
      rating: 9.0
    },
    '2': {
      id: '2',
      title: 'Inception',
      poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      duration: '2h 28m',
      rating: 8.8
    },
    '3': {
      id: '3',
      title: 'Interstellar',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      duration: '2h 49m',
      rating: 8.6
    },
    '4': {
      id: '4',
      title: 'The Shawshank Redemption',
      poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      duration: '2h 22m',
      rating: 9.3
    }
  };

  // Mock showtimes for a week
  useEffect(() => {
    // Generate dates for the next 7 days
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    setDatesList(dates);

    // Generate mock showtimes for each date
    const allShowtimes: Record<string, Showtime[]> = {};
    
    dates.forEach(date => {
      const dayShowtimes: Showtime[] = [];
      
      // The Dark Knight
      ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'].forEach((time, idx) => {
        dayShowtimes.push({
          id: `1-${date}-${idx}`,
          movieId: '1',
          screen: 'Screen 1',
          time,
          date,
          format: 'IMAX',
          availableSeats: Math.floor(Math.random() * 100) + 20
        });
      });
      
      // Inception
      ['11:30 AM', '2:30 PM', '5:30 PM', '8:30 PM'].forEach((time, idx) => {
        dayShowtimes.push({
          id: `2-${date}-${idx}`,
          movieId: '2',
          screen: 'Screen 2',
          time,
          date,
          format: 'Standard',
          availableSeats: Math.floor(Math.random() * 100) + 20
        });
      });
      
      // Interstellar
      ['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'].forEach((time, idx) => {
        dayShowtimes.push({
          id: `3-${date}-${idx}`,
          movieId: '3',
          screen: 'Screen 3',
          time,
          date,
          format: '3D',
          availableSeats: Math.floor(Math.random() * 100) + 20
        });
      });
      
      // The Shawshank Redemption
      ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'].forEach((time, idx) => {
        dayShowtimes.push({
          id: `4-${date}-${idx}`,
          movieId: '4',
          screen: 'Screen 4',
          time,
          date,
          format: 'VIP',
          availableSeats: Math.floor(Math.random() * 50) + 10
        });
      });
      
      allShowtimes[date] = dayShowtimes;
    });
    
    setShowtimes(allShowtimes);
    setMovies(mockMovies);
    setIsLoading(false);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  const getMovieShowtimes = () => {
    const movieShowtimes: Record<string, Showtime[]> = {};
    
    if (showtimes[date]) {
      showtimes[date].forEach(showtime => {
        if (!movieShowtimes[showtime.movieId]) {
          movieShowtimes[showtime.movieId] = [];
        }
        movieShowtimes[showtime.movieId].push(showtime);
      });
    }
    
    return movieShowtimes;
  };

  // Group showtimes by movie
  const movieShowtimes = getMovieShowtimes();

  return (
    <Layout>
      <Head>
        <title>Movie Schedule | BigScreenBiz</title>
        <meta name="description" content="View our movie schedule and book tickets" />
      </Head>

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Movie Schedule</h1>

          {/* Date Selector */}
          <div className="mb-8 overflow-auto pb-4">
            <div className="flex space-x-2">
              {datesList.map((d) => (
                <button
                  key={d}
                  onClick={() => setDate(d)}
                  className={`${
                    date === d
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  } px-4 py-3 rounded-lg shadow min-w-[120px] transition-colors duration-200 flex flex-col items-center`}
                >
                  <span className="text-xs font-semibold mb-1">
                    {isToday(d) ? 'TODAY' : new Date(d).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="text-lg font-bold">
                    {new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="w-32 h-48 bg-gray-300 rounded mr-6"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {[1, 2, 3, 4, 5].map((j) => (
                          <div key={j} className="h-10 bg-gray-300 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : Object.keys(movieShowtimes).length > 0 ? (
            <div className="grid gap-8">
              {Object.entries(movieShowtimes).map(([movieId, showtimes]) => {
                const movie = movies[movieId];
                if (!movie) return null;
                
                // Group showtimes by format
                const formatShowtimes: Record<string, Showtime[]> = {};
                showtimes.forEach(showtime => {
                  if (!formatShowtimes[showtime.format]) {
                    formatShowtimes[showtime.format] = [];
                  }
                  formatShowtimes[showtime.format].push(showtime);
                });
                
                return (
                  <Card key={movieId} variant="elevated" padding="none" className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-auto md:mr-6 mb-4 md:mb-0">
                          <Link href={`/movies/${movie.id}`}>
                            <img
                              src={movie.poster}
                              alt={`${movie.title} poster`}
                              className="w-full md:w-32 h-auto rounded-lg shadow"
                            />
                          </Link>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <Link href={`/movies/${movie.id}`}>
                                <h2 className="text-2xl font-bold hover:text-purple-600">{movie.title}</h2>
                              </Link>
                              <p className="text-gray-600">
                                {movie.duration} • ⭐ {movie.rating.toFixed(1)}
                              </p>
                            </div>
                            <Link href={`/movies/${movie.id}`}>
                              <Button variant="ghost" size="sm">
                                Movie Details
                              </Button>
                            </Link>
                          </div>
                          
                          <div className="space-y-4">
                            {Object.entries(formatShowtimes).map(([format, formatTimes]) => (
                              <div key={format}>
                                <div className="flex items-center mb-3">
                                  <span className="font-semibold text-gray-700 mr-2">{format}</span>
                                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                                    {formatTimes[0].screen}
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                  {formatTimes.map((showtime) => (
                                    <Link 
                                      href={`/booking/${movie.id}?showtime=${showtime.id}`} 
                                      key={showtime.id}
                                    >
                                      <Button
                                        variant={showtime.availableSeats < 30 ? "outline" : "ghost"}
                                        className={`w-full ${
                                          showtime.availableSeats < 30 
                                            ? "border-yellow-500 text-yellow-700" 
                                            : ""
                                        }`}
                                      >
                                        <div className="text-center">
                                          <div>{showtime.time}</div>
                                          {showtime.availableSeats < 30 && (
                                            <div className="text-xs mt-1">
                                              {showtime.availableSeats} seats left
                                            </div>
                                          )}
                                        </div>
                                      </Button>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-bold mb-2">No Showtimes Available</h2>
              <p className="text-gray-600 mb-6">There are no showtimes scheduled for this date.</p>
              <Link href="/movies">
                <Button variant="primary">Browse Movies</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 