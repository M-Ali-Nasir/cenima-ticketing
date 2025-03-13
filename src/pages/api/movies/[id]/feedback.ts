import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import Movie from '@/models/Movie';
import { isAuthenticated } from '@/utils/auth';
import { moderateFeedback } from '@/utils/feedbackAnalysis';
import { AuthToken } from '@/utils/auth';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  user: AuthToken
) {
  const { id } = req.query;

  await dbConnect();

  // GET - Retrieve all feedback for a movie
  if (req.method === 'GET') {
    try {
      const movie = await Movie.findById(id).select('reviews');

      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }

      return res.status(200).json({
        success: true,
        data: movie.reviews,
      });
    } catch (error) {
      console.error('Error fetching feedback:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // POST - Submit new feedback
  if (req.method === 'POST') {
    try {
      const { rating, comment } = req.body;

      if (!rating || !comment) {
        return res.status(400).json({
          success: false,
          message: 'Please provide rating and comment',
        });
      }

      // Validate rating
      const numericRating = Number(rating);
      if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
        return res.status(400).json({
          success: false,
          message: 'Rating must be between 1 and 5',
        });
      }

      // Moderate the feedback
      const moderation = moderateFeedback(comment);

      if (!moderation.isApproved) {
        return res.status(400).json({
          success: false,
          message: 'Feedback rejected by moderation',
          reason: moderation.reason,
        });
      }

      const movie = await Movie.findById(id);

      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }

      // Check if user has already submitted feedback
      const existingReview = movie.reviews.find(
        (review: { user: { toString: () => string } }) => review.user.toString() === user.userId
      );

      if (existingReview) {
        // Update existing review
        existingReview.rating = numericRating;
        existingReview.comment = moderation.moderatedText;
        existingReview.createdAt = new Date();
      } else {
        // Add new review
        movie.reviews.push({
          user: user.userId,
          rating: numericRating,
          comment: moderation.moderatedText,
          createdAt: new Date(),
        });
      }

      // Update movie rating
      const totalRating = movie.reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0);
      movie.rating = totalRating / movie.reviews.length;

      await movie.save();

      return res.status(201).json({
        success: true,
        data: {
          message: 'Feedback submitted successfully',
        },
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  // DELETE - Remove feedback
  if (req.method === 'DELETE') {
    try {
      const movie = await Movie.findById(id);

      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }

      // Find the review index
      const reviewIndex = movie.reviews.findIndex(
        (review: { user: { toString: () => string } }) => review.user.toString() === user.userId
      );

      if (reviewIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Review not found',
        });
      }

      // Remove the review
      movie.reviews.splice(reviewIndex, 1);

      // Update movie rating
      if (movie.reviews.length > 0) {
        const totalRating = movie.reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0);
        movie.rating = totalRating / movie.reviews.length;
      } else {
        movie.rating = 0;
      }

      await movie.save();

      return res.status(200).json({
        success: true,
        data: {
          message: 'Feedback removed successfully',
        },
      });
    } catch (error) {
      console.error('Error removing feedback:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default isAuthenticated(handler);
