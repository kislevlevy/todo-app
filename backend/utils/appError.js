class AppError extends Error {
  constructor(statusCode = 500, message) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
    this.status = String(statusCode).startsWith(4) ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
