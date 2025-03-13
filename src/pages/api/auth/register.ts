import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { generateToken } from '@/utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { name, email, password, gender } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use',
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      gender: gender || 'prefer-not-to-say',
    });

    // Generate JWT token
    const token = generateToken(user);

    // Return user info and token
    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          gender: user.gender,
        },
        token,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors,
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
} 