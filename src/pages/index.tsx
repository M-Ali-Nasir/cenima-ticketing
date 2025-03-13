import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import Hero from '../components/common/Hero';
import MovieGrid from '../components/movies/MovieGrid';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface FeaturedMovie {
  id: string;
  title: string;
  description: string;
  poster: string;
}

interface Movie {
  id: string;
  title: string;
  genre: string[];
  releaseDate: string;
  poster: string;
  rating: number;
  duration: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredMovies, setFeaturedMovies] = useState<FeaturedMovie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  // Mock data for development
  const mockFeaturedMovies = [
    {
      id: '1',
      title: 'The Dark Knight',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      poster: 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    },
    {
      id: '2',
      title: 'Inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      poster: 'https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    },
    {
      id: '3',
      title: 'Interstellar',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      poster: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    }
  ];

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
    }
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setFeaturedMovies(mockFeaturedMovies);
      setNewReleases(mockMovies);
      setPopularMovies(mockMovies.slice().reverse());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Head>
        <title>BigScreenBiz - Cinema Management System</title>
        <meta name="description" content="A comprehensive cinema management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <Hero featuredMovies={featuredMovies} />

      <div className="container mx-auto px-4 py-12">
        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
            Why Choose <span className="text-purple-600">BigScreenBiz</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="elevated" className="text-center h-full flex flex-col">
              <div className="text-purple-600 mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Easy Online Booking</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Book your tickets online with just a few clicks. Choose your seats, select your snacks, and enjoy your movie without waiting in line.
              </p>
              <Link href="/movies" className="mt-auto">
                <Button variant="ghost" size="sm" className="mx-auto">
                  Book Now
                </Button>
              </Link>
            </Card>
            
            <Card variant="elevated" className="text-center h-full flex flex-col">
              <div className="text-purple-600 mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Personalized Recommendations</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Get movie recommendations tailored to your preferences based on your viewing history and ratings.
              </p>
              <Link href="/recommendations" className="mt-auto">
                <Button variant="ghost" size="sm" className="mx-auto">
                  Get Recommendations
                </Button>
              </Link>
            </Card>
            
            <Card variant="elevated" className="text-center h-full flex flex-col">
              <div className="text-purple-600 mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Real-time Notifications</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Receive notifications about new releases, special offers, ticket confirmations, and upcoming movies.
              </p>
              <Link href="/notifications" className="mt-auto">
                <Button variant="ghost" size="sm" className="mx-auto">
                  Manage Notifications
                </Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* New Releases */}
        <MovieGrid
          title="New Releases"
          movies={newReleases}
          loading={isLoading}
        />

        {/* CTA Banner */}
        <section className="relative py-16 px-8 rounded-2xl mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-purple-700 opacity-95 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
            style={{ backgroundImage: "url('https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg')" }}
          ></div>
          
          <div className="relative z-20 max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Become a Premium Member</h2>
            <p className="text-lg mb-8 text-purple-100">
              Enjoy exclusive benefits like discounted tickets, free snacks, early access to blockbuster premieres, and more!
            </p>
            <Link href="/membership">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-700">
                Join Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Popular Movies */}
        <MovieGrid
          title="Popular This Week"
          movies={popularMovies}
          loading={isLoading}
        />
      </div>
    </Layout>
  );
} 