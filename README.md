# BigScreenBiz - Cinema Management System

A comprehensive web-based application designed to streamline administrative tasks, enhance operational efficiency, boost revenue, reduce costs, and improve customer satisfaction for cinema businesses.

## Features

### Core Modules

1. **User Login and Authentication** - Secure user authentication system
2. **Gender-based Reservation** - Allows for gender-specific seating arrangements
3. **Movie Scheduling** - Efficient management of movie schedules
4. **Ticket Cancellation and Refund** - Seamless process for cancellations and refunds
5. **Notification Module** - Real-time notifications for users
6. **Feedback and Review** - User feedback and review system

### Distinguishing Features

1. **Recommendations** - Personalized movie recommendations for users
2. **AI-based Feedback** - NLP model for detection of offensive comments
3. **Watchlist** - Helps users keep track of their favorite movies
4. **Sales Report Movie-wise** - Generate revenue reports for each movie

## Technology Stack

- **Frontend**: React with Next.js
- **Backend**: Node.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Styling**: Tailwind CSS
- **NLP**: Natural.js for AI-based feedback

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- MongoDB

### Installation

1. Clone the repository

```
git clone https://github.com/yourusername/bigscreenbiz.git
cd bigscreenbiz
```

2. Install dependencies

```
npm install
```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Run the development server

```
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
bigscreenbiz/
├── src/
│   ├── api/          # API routes
│   ├── components/   # Reusable components
│   ├── context/      # React context for state management
│   ├── models/       # Database models
│   ├── pages/        # Next.js pages
│   ├── styles/       # CSS and styling
│   └── utils/        # Utility functions
├── public/           # Static files
├── .env.local        # Environment variables
├── package.json      # Dependencies
└── README.md         # Project documentation
```

## License

This project is licensed under the ISC License.
