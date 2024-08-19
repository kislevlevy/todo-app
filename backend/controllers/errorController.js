// Imports:
import AppError from '../utils/appError.js';

//////////////////////////////////////////////////
// DEV:
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

// PROD:
const sendErrorProd = (err, res) => {
  // Known error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Unknown error:
  } else {
    console.error('Error:', err);
    console.log(err.name);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong.',
    });
  }
};

//////////////////////////////////////////////////
// Duplicate input on Unique fields:
const handleUniqueError = (err) => {
  const value = err.errmsg.match(/"(.*?)"/)[0].replaceAll('"', '');
  const message = `Duplicate field value (${value}), please use a unique value.`;

  return new AppError(400, message);
};

// Values in fields don't match validation:
const handleValidationError = (err) => {
  // Extarct fields with errors:
  const fields = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${fields.join('. ').trim()}`;

  return new AppError(400, message);
};

// Json web token error
const handleJWTError = () => new AppError(401, 'Invalid token, please login again');

//////////////////////////////////////////////////
// Generate new Error function:
export default (err, req, res, next) => {
  // Assing status and status code:
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Development error:
  if (process.env.ENV === 'development') return sendErrorDev(err, res);

  // Production error:
  if (process.env.ENV === 'production') {
    let prodError = Object.create(err);

    // Duplicate input error:
    if (err.code === 11000) prodError = handleUniqueError(err);
    // Validation error:
    if (err.name === 'ValidationError') prodError = handleValidationError(err);
    // JWT error:
    if (['TokenExpiredError', 'JsonWebTokenError'].includes(err.name))
      prodError = handleJWTError();

    // Return error:
    return sendErrorProd(prodError, res);
  }
};
