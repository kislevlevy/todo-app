// Imports:
import catchAsync from 'express-async-handler';

import ApiFeatures from './apiFeatures.js';
import AppError from './appError.js';

//////////////////////////////////////////////////
// Get all products by query:
export const getDocs = (Model, name) =>
  catchAsync(async (req, res, next) => {
    const filter = {};
    if (req.params.id) filter.user = req.params.id;

    const features = new ApiFeatures(req, Model.find(filter))
      .filter()
      .sort()
      .fields()
      .pagination();

    // Fetch filterd docs:
    const docs = await features.res;
    if (!docs || docs.length < 1)
      return next(new AppError(404, 'Filter had returnd 0 results.'));

    // Server response:
    return res.status(200).json({
      status: 'success',
      results: docs.length,
      [name]: docs,
    });
  });

// GET document by ID:
export const getDocById = (Model, name) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findById(id);
    if (!doc)
      return next(
        new AppError(404, `Connot find document with this query - ${id}.`)
      );

    // Server response:
    return res.status(200).json({
      status: 'success',
      [name]: doc,
      [name + 's']: await Model.find(),
    });
  });

// New Document:
export const createDoc = (Model, name) =>
  catchAsync(async (req, res, next) => {
    // Create new product:
    req.doc = await Model.create(req.body);
    if (!req.doc)
      return next(
        new AppError(
          404,
          'Connot create document, check your body for correct layout.'
        )
      );

    // Server response:
    return res.status(200).json({
      status: 'success',
      [name]: req.doc,
      [name + 's']: await Model.find(),
    });
  });

// Edit document by id:
export const patchDocById = (Model, name) =>
  catchAsync(async (req, res, next) => {
    req.doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!req.doc) return next(new AppError(404, 'Document ID was not found.'));

    if (req.file) return next();

    // Server response:
    return res.status(200).json({
      status: 'success',
      [name]: req.doc,
      [name + 's']: await Model.find(),
    });
  });

// Delete document by id:
export const deleteDocById = (Model) =>
  catchAsync(async (req, res, next) => {
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);
    if (!deletedDoc) return next(new AppError(404, 'Document ID was not found.'));

    // Server response:
    return res.status(204).json({
      status: 'success',
    });
  });
