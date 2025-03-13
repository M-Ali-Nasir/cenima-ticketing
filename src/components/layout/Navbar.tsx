import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if user is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'md:bg-gray-100 md:shadow-lg bg-gray-100' 
          : 'md:bg-gray-100/80 bg-gray-100/90'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              BigScreenBiz
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link 
                href="/" 
                className={`${
                  router.pathname === '/' 
                    ? 'text-white border-b-2 border-purple-500 font-bold' 
                    : 'text-white hover:text-purple-300 font-semibold'
                } px-1 py-2 text-sm transition-all duration-200 text-shadow-lg`}
              >
                Home
              </Link>
              <Link 
                href="/movies" 
                className={`${
                  router.pathname.includes('/movies') 
                    ? 'text-white border-b-2 border-purple-500 font-bold' 
                    : 'text-white hover:text-purple-300 font-semibold'
                } px-1 py-2 text-sm transition-all duration-200 text-shadow-lg`}
              >
                Movies
              </Link>
              <Link 
                href="/schedule" 
                className={`${
                  router.pathname.includes('/schedule') 
                    ? 'text-white border-b-2 border-purple-500 font-bold' 
                    : 'text-white hover:text-purple-300 font-semibold'
                } px-1 py-2 text-sm transition-all duration-200 text-shadow-lg`}
              >
                Schedule
              </Link>
              <Link 
                href="/contact" 
                className={`${
                  router.pathname === '/contact' 
                    ? 'text-white border-b-2 border-purple-500 font-bold' 
                    : 'text-white hover:text-purple-300 font-semibold'
                } px-1 py-2 text-sm transition-all duration-200 text-shadow-lg`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Login / User Button */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="flex items-center">
                <Link 
                  href="/profile" 
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-l-md transition-all duration-200"
                >
                  My Account
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-200 py-4`}>
        <div className="flex flex-col space-y-3 px-4">
          <Link 
            href="/" 
            className={`${
              router.pathname === '/' 
                ? 'bg-purple-100 text-purple-900 font-bold' 
                : 'text-gray-900 hover:bg-gray-100 hover:text-purple-900'
            } w-full py-3 px-4 rounded-lg text-base font-medium text-center`}
          >
            Home
          </Link>
          <Link 
            href="/movies" 
            className={`${
              router.pathname.includes('/movies') 
                ? 'bg-purple-100 text-purple-900 font-bold' 
                : 'text-gray-900 hover:bg-gray-100 hover:text-purple-900'
            } w-full py-3 px-4 rounded-lg text-base font-medium text-center`}
          >
            Movies
          </Link>
          <Link 
            href="/schedule" 
            className={`${
              router.pathname.includes('/schedule') 
                ? 'bg-purple-100 text-purple-900 font-bold' 
                : 'text-gray-900 hover:bg-gray-100 hover:text-purple-900'
            } w-full py-3 px-4 rounded-lg text-base font-medium text-center`}
          >
            Schedule
          </Link>
          <Link 
            href="/contact" 
            className={`${
              router.pathname === '/contact' 
                ? 'bg-purple-100 text-purple-900 font-bold' 
                : 'text-gray-900 hover:bg-gray-100 hover:text-purple-900'
            } w-full py-3 px-4 rounded-lg text-base font-medium text-center`}
          >
            Contact
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link 
                href="/profile" 
                className="w-full py-3 px-4 rounded-lg text-base font-medium text-center text-gray-900 hover:bg-gray-100 hover:text-purple-900"
              >
                My Account
              </Link>
              <button 
                onClick={handleLogout} 
                className="w-full py-3 px-4 rounded-lg text-base font-medium text-center text-gray-900 hover:bg-gray-100 hover:text-purple-900"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              className="w-full py-3 px-4 rounded-lg text-base font-medium text-center bg-purple-600 text-white hover:bg-purple-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 