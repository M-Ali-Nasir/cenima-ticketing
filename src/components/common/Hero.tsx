import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
}

interface HeroProps {
  featuredMovies: Movie[];
}

const Hero = ({ featuredMovies = [] }: HeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Auto-rotate featured movies
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded || featuredMovies.length === 0) {
    return (
      <div className="w-full h-[600px] bg-gray-900 animate-pulse"></div>
    );
  }

  const currentMovie = featuredMovies[currentIndex];

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url(${currentMovie.poster})`,
            opacity: 0.6
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {currentMovie.title}
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            {currentMovie.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={`/movies/${currentMovie.id}`}>
              <Button 
                variant="primary" 
                size="lg"
                rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                }
              >
                View Details
              </Button>
            </Link>
            <Link href={`/booking/${currentMovie.id}`}>
              <Button variant="outline" size="lg" className="backdrop-blur-sm bg-white/10">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Indicators */}
      {featuredMovies.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-purple-500 w-6' 
                  : 'bg-gray-400 bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero; 