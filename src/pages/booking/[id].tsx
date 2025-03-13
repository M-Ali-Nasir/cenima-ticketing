import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

interface Movie {
  id: string;
  title: string;
  poster: string;
  duration: string;
}

interface Showtime {
  id: string;
  time: string;
  date: string;
  screen: string;
  format: string;
}

interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'reserved';
  type: 'standard' | 'premium' | 'vip';
  price: number;
}

export default function BookingPage() {
  const router = useRouter();
  const { id, showtime: showtimeId } = router.query;
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');

  // Mock data
  useEffect(() => {
    if (!id) return;

    // Simulate API call
    setTimeout(() => {
      // Mock movie data
      const mockMovie: Movie = {
        id: id as string,
        title: 'The Dark Knight',
        poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        duration: '2h 32m'
      };
      
      // Mock showtime data
      const mockShowtime: Showtime = {
        id: showtimeId as string || '1',
        time: '7:00 PM',
        date: '2023-06-15',
        screen: 'Screen 1',
        format: 'IMAX'
      };
      
      // Generate mock seats
      const mockSeats: Seat[] = [];
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      
      rows.forEach(row => {
        for (let i = 1; i <= 12; i++) {
          const seatType = row === 'A' || row === 'B' ? 'premium' : 
                          (row === 'G' || row === 'H' ? 'vip' : 'standard');
          
          const seatPrice = seatType === 'premium' ? 15 : 
                           (seatType === 'vip' ? 20 : 12);
          
          // Make some seats randomly reserved
          const status = Math.random() > 0.8 ? 'reserved' : 'available';
          
          mockSeats.push({
            id: `${row}${i}`,
            row,
            number: i,
            status,
            type: seatType,
            price: seatPrice
          });
        }
      });
      
      setMovie(mockMovie);
      setShowtime(mockShowtime);
      setSeats(mockSeats);
      setIsLoading(false);
    }, 1000);
  }, [id, showtimeId]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'reserved') return;
    
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const handleContinue = () => {
    if (step === 1 && selectedSeats.length > 0) {
      setStep(2);
    } else if (step === 2 && paymentMethod) {
      setStep(3);
    }
  };

  const handlePayment = () => {
    // Simulate payment processing
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setBookingComplete(true);
      setBookingNumber(`BKG${Math.floor(Math.random() * 1000000)}`);
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="bg-gray-300 rounded-lg h-[300px]"></div>
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

  if (!movie || !showtime) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
          <p className="mb-8">The movie you're looking for could not be found.</p>
          <Link href="/movies">
            <Button variant="primary">Browse Movies</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Book Tickets for {movie.title} | BigScreenBiz</title>
        <meta name="description" content={`Book tickets for ${movie.title} at BigScreenBiz`} />
      </Head>

      <div className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Booking Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-8">
              <div className={`flex items-center ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <span className="ml-2 font-medium">Select Seats</span>
              </div>
              <div className={`w-12 h-1 mx-2 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
              <div className={`w-12 h-1 mx-2 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
                <span className="ml-2 font-medium">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Movie and Showtime Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-auto md:mr-6 mb-4 md:mb-0">
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  className="w-full md:w-32 h-auto rounded-lg shadow"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
                <div className="text-gray-600 mb-4">
                  <p>{formatDate(showtime.date)} • {showtime.time}</p>
                  <p>{showtime.screen} • {showtime.format}</p>
                  <p>Duration: {movie.duration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Content */}
          {bookingComplete ? (
            <Card variant="elevated" className="p-8 text-center max-w-2xl mx-auto">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-4">Your tickets have been booked successfully.</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-lg font-bold">Booking Number: {bookingNumber}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="font-bold mb-4">Booking Details</h3>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-gray-600">Movie</p>
                    <p className="font-medium">{movie.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date & Time</p>
                    <p className="font-medium">{formatDate(showtime.date)} • {showtime.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Screen</p>
                    <p className="font-medium">{showtime.screen} • {showtime.format}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Seats</p>
                    <p className="font-medium">{selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Amount</p>
                    <p className="font-bold">${getTotalPrice().toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Payment Method</p>
                    <p className="font-medium">{paymentMethod}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/">
                  <Button variant="outline">Back to Home</Button>
                </Link>
                <Link href="/movies">
                  <Button variant="primary">Browse More Movies</Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {step === 1 && (
                  <Card variant="elevated" className="p-6">
                    <h2 className="text-xl font-bold mb-6">Select Your Seats</h2>
                    
                    {/* Screen */}
                    <div className="relative mb-10">
                      <div className="h-8 bg-gray-300 rounded-lg w-full mb-2 transform perspective-500 rotateX-40"></div>
                      <p className="text-center text-gray-500 text-sm">SCREEN</p>
                    </div>
                    
                    {/* Seat Map */}
                    <div className="mb-8">
                      <div className="grid grid-cols-12 gap-2 mb-6">
                        {seats.map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat)}
                            disabled={seat.status === 'reserved'}
                            className={`
                              w-6 h-6 rounded-t-lg flex items-center justify-center text-xs font-medium
                              ${seat.status === 'reserved' ? 'bg-gray-300 cursor-not-allowed' : 
                                seat.status === 'selected' || selectedSeats.some(s => s.id === seat.id) ? 'bg-purple-600 text-white' : 
                                seat.type === 'premium' ? 'bg-blue-100 hover:bg-blue-200' : 
                                seat.type === 'vip' ? 'bg-yellow-100 hover:bg-yellow-200' : 
                                'bg-gray-100 hover:bg-gray-200'
                              }
                            `}
                            title={`${seat.row}${seat.number} - $${seat.price}`}
                          >
                            {seat.number}
                          </button>
                        ))}
                      </div>
                      
                      {/* Seat Legend */}
                      <div className="flex flex-wrap gap-4 justify-center mb-6">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-gray-100 rounded-t-sm mr-2"></div>
                          <span className="text-sm">Available ($12)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-blue-100 rounded-t-sm mr-2"></div>
                          <span className="text-sm">Premium ($15)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-yellow-100 rounded-t-sm mr-2"></div>
                          <span className="text-sm">VIP ($20)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-purple-600 rounded-t-sm mr-2"></div>
                          <span className="text-sm">Selected</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-gray-300 rounded-t-sm mr-2"></div>
                          <span className="text-sm">Reserved</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {step === 2 && (
                  <Card variant="elevated" className="p-6">
                    <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                    
                    <div className="space-y-4 mb-8">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'credit_card' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                        onClick={() => setPaymentMethod('credit_card')}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border ${paymentMethod === 'credit_card' ? 'border-purple-500' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                            {paymentMethod === 'credit_card' && <div className="w-3 h-3 rounded-full bg-purple-500"></div>}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Credit / Debit Card</h3>
                            <p className="text-sm text-gray-500">Pay securely with your card</p>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'paypal' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                        onClick={() => setPaymentMethod('paypal')}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border ${paymentMethod === 'paypal' ? 'border-purple-500' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                            {paymentMethod === 'paypal' && <div className="w-3 h-3 rounded-full bg-purple-500"></div>}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">PayPal</h3>
                            <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                          </div>
                          <div className="w-16 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'apple_pay' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                        onClick={() => setPaymentMethod('apple_pay')}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border ${paymentMethod === 'apple_pay' ? 'border-purple-500' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                            {paymentMethod === 'apple_pay' && <div className="w-3 h-3 rounded-full bg-purple-500"></div>}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Apple Pay</h3>
                            <p className="text-sm text-gray-500">Pay with Apple Pay</p>
                          </div>
                          <div className="w-16 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {step === 3 && (
                  <Card variant="elevated" className="p-6">
                    <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
                    
                    <div className="space-y-6 mb-8">
                      <div className="border-b pb-4">
                        <h3 className="font-medium mb-2">Movie Details</h3>
                        <p className="text-gray-600">{movie.title}</p>
                        <p className="text-gray-600">{formatDate(showtime.date)} • {showtime.time}</p>
                        <p className="text-gray-600">{showtime.screen} • {showtime.format}</p>
                      </div>
                      
                      <div className="border-b pb-4">
                        <h3 className="font-medium mb-2">Selected Seats</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedSeats.map(seat => (
                            <div key={seat.id} className="bg-gray-100 px-2 py-1 rounded text-sm">
                              {seat.row}{seat.number} - ${seat.price}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Payment Method</h3>
                        <p className="text-gray-600">
                          {paymentMethod === 'credit_card' ? 'Credit / Debit Card' : 
                           paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="primary" 
                      size="lg" 
                      isFullWidth 
                      onClick={handlePayment}
                      isLoading={isLoading}
                    >
                      Pay ${getTotalPrice().toFixed(2)}
                    </Button>
                  </Card>
                )}
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card variant="elevated" className="p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tickets ({selectedSeats.length})</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking Fee</span>
                      <span>$1.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${(getTotalPrice() + 1.50 + getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {step < 3 && (
                    <Button 
                      variant="primary" 
                      size="lg" 
                      isFullWidth 
                      onClick={handleContinue}
                      disabled={step === 1 && selectedSeats.length === 0 || step === 2 && !paymentMethod}
                    >
                      {step === 1 ? 'Continue to Payment' : 'Review Order'}
                    </Button>
                  )}
                  
                  {step > 1 && (
                    <button 
                      className="mt-4 text-center w-full text-purple-600 hover:text-purple-700"
                      onClick={() => setStep(step - 1)}
                    >
                      Back to {step === 2 ? 'Seat Selection' : 'Payment'}
                    </button>
                  )}
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 