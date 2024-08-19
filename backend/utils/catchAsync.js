// Imports:
import AppError from './appError.js';

export default function (func) {
  return (req, res, next) =>
    func(req, res, next).catch((err) => next(new AppError(400, err.message)));
}
