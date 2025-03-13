import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import Movie from '@/models/Movie';
import User from '@/models/User';
import Booking from '@/models/Booking';
import { isAuthenticated } from '@/utils/auth';
import { generateRecommendations } from '@/utils/recommendations';
import { AuthToken } from '@/utils/auth';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  user: AuthToken
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Get user details
    const userDetails = await User.findById(user.userId);

    if (!userDetails) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get all movies
    const movies = await Movie.find({});

    // Get user's booking history
    const userBookings = await Booking.find({ user: user.userId });

    // Generate recommendations
    const recommendations = await generateRecommendations(
      userDetails,
      movies,
      userBookings
    );

    // Limit to top 10 recommendations
    const topRecommendations = recommendations.slice(0, 10);

    return res.status(200).json({
      success: true,
      data: topRecommendations,
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default isAuthenticated(handler); 