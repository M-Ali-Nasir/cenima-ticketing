import { useState } from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface MovieCardProps {
  id: string;
  title: string;
  genre: string[];
  releaseDate: string;
  poster: string;
  rating: number;
  duration: string;
}

const MovieCard = ({ id, title, genre, releaseDate, poster, rating, duration }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div 
      className="h-full transition-all duration-300 transform hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card variant="elevated" padding="none" className="h-full flex flex-col">
        <div className="relative">
          <Card.Image 
            src={poster || '/placeholder-movie.jpg'} 
            alt={`${title} poster`} 
            className="h-[380px]"
          />
          
          <div className="absolute top-2 right-2 bg-purple-600 text-white font-bold py-1 px-2 rounded">
            {rating.toFixed(1)}
          </div>
          
          {/* Hover overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 transition-opacity duration-300">
              <div className="text-center">
                <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
                <p className="text-gray-300 mb-2">{genre.join(', ')}</p>
                <p className="text-gray-300 mb-4">{duration} • {formatDate(releaseDate)}</p>
                <div className="flex justify-center space-x-2">
                  <Link href={`/movies/${id}`}>
                    <Button variant="primary" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/booking/${id}`}>
                    <Button variant="outline" size="sm" className="bg-white bg-opacity-10">
                      Book Tickets
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 flex-grow">
          <h3 className="font-bold text-lg truncate">{title}</h3>
          <p className="text-gray-600 text-sm">{genre.slice(0, 2).join(', ')}{genre.length > 2 ? '...' : ''}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-500">{duration}</span>
            <span className="text-sm text-gray-500">{formatDate(releaseDate)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MovieCard; 