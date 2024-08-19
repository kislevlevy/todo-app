// Imports:
import catchAsync from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from '../models/userModel.js';
import AppError from '../utils/appError.js';

//////////////////////////////////////////////////
// Register:
export const newUser = catchAsync(async (req, res, next) => {
  req.user = await User.create(req.body);
  if (!req.user)
    return next(new AppError(404, 'Connot create new user, check your fields.'));

  // Next function:
  next();
});

// Login:
export const loginUser = catchAsync(async (req, res, next) => {
  // Get variables:
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError(404, 'Missing email/password.'));

  // Find user by Email:
  req.user = await User.findOne({
    email: email.toLowerCase().trim(),
  }).select('+password');

  if (!req.user) return next(new AppError(403, 'Email or password is incorrect.'));

  // Check password:
  if (await req.user.isPasswordCorrect(password, req.user.password)) next();
  else return next(new AppError(403, 'Email or password is incorrect.'));
});

export const generateToken = catchAsync((req, res, next) => {
  // Generate Token:
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Cookie assign:
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 86_400_000 * +process.env.COOKIE_EXPIRES_IN),
    httpOnly: false,
    secure: true,
    sameSite: 'none',
    path: '/',
  });

  // Server response:
  req.user.password = undefined;
  return res.status(200).json({
    status: 'success',
    user: req.user,
  });
});

// Check token:
export const checkToken = catchAsync(async (req, res, next) => {
  //Get token from req:
  if (!req.cookies || !req.cookies.jwt)
    return next(new AppError(403, 'User not logged in. - cookies'));
  const { jwt: token } = req.cookies;

  // Verify token:
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded || decoded.exp < Date.now() / 1000)
    return next(
      new AppError(403, 'User session has expierd. please log in. - decoded')
    );

  // Get user by id:
  req.user = await User.findById(decoded.id);
  if (!req.user) return next(new AppError(403, 'User not logged in. - user'));

  // Check for password change:
  if (req.user.passwordChangedAt > new Date(decoded.iat * 1000))
    return next(
      new AppError(
        403,
        'Password has changed, Token is not valid anymore. please login again.'
      )
    );

  // Go to next function:
  next();
});

// User logout:
export const logoutUser = function (req, res, next) {
  res.clearCookie('jwt', {
    httpOnly: false,
    secure: true,
    sameSite: 'none',
    path: '/',
  });
  res.clearCookie('jwt');

  // Server response:
  return res.status(200).json({
    status: 'success',
    user: null,
  });
};
