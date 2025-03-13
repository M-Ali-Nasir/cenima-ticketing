import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

if (!JWT_SECRET) {
  throw new Error(
    'Please define the JWT_SECRET environment variable inside .env.local'
  );
}

export interface AuthToken {
  userId: string;
  email: string;
  role: string;
}

export function generateToken(user: IUser): string {
  const payload: AuthToken = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
}

export function verifyToken(token: string): AuthToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthToken;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(req: NextApiRequest): string | null {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return req.cookies?.token || null;
}

export async function authenticateUser(
  req: NextApiRequest,
  res: NextApiResponse,
  requiredRoles: string[] = []
): Promise<AuthToken | null> {
  const token = getTokenFromRequest(req);

  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return null;
  }

  // Check if user has required role
  if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
    return null;
  }

  return decoded;
}

export function isAuthenticated(
  handler: (req: NextApiRequest, res: NextApiResponse, user: AuthToken) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await authenticateUser(req, res);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    return handler(req, res, user);
  };
}

export function hasRole(
  handler: (req: NextApiRequest, res: NextApiResponse, user: AuthToken) => Promise<void>,
  roles: string[]
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await authenticateUser(req, res, roles);

    if (!user) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    return handler(req, res, user);
  };
} 