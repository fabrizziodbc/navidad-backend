import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import HttpError from '../models/http.error.model.js';
import List from '../models/list.model.js';
import User from '../models/user.model.js';

const validId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await List.findById(id)
      .select('-__v')
      .populate({ path: 'author', select: 'name email' });
    if (!data) {
      const message = 'List not found';
      next({ message, statuscode: 404, level: 'warn' });
    } else {
      req.doc = data;
      next();
    }
  } catch (error) {
    next(new HttpError('Invalid Id', 403));
  }
};
const fetchAll = async (req, res, next) => {
  try {
    const data = await List.find({})
      .select('-__v')
      .populate({ path: 'author', select: 'name email' });
    res.json({ data });
  } catch (error) {
    next(new HttpError('Fetching Lists failed, please try again later', 500));
  }
};
const create = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(errors);
  }
  const { body = {} } = req;
  console.log(body.author);
  const newDocument = new List(body);
  let user;
  try {
    user = await User.findById(body.author);
    console.log(user);
  } catch (error) {
    return next(
      new HttpError('Creating list failed, please try again later', 500),
    );
  }
  if (!user) {
    return next(new HttpError('Could not find user for provided Id', 404));
  }
  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      await newDocument.save({ session });
      await user.list.push(newDocument);
      await user.save({ session });
    });
    await session.endSession();
  } catch (error) {
    console.log(error);
    return next(
      new HttpError('Creating list failed, please try again later', 500),
    );
  }
  return res.status(201).json({ list: newDocument });
};
const getListByUserId = async (req, res, next) => {
  const { params } = req;
  let authorWithLists;
  try {
    authorWithLists = await User.findById(params.userId)
      .select('-__v')
      .populate('list', 'listName');
  } catch (error) {
    console.log(error);
    return next(
      new HttpError('Fetching lists failed, please try again later', 404),
    );
  }
  if (!authorWithLists || !authorWithLists.list.length) {
    return next(
      new HttpError(
        'Could not found any lists for the provider userId, please try again later',
        500,
      ),
    );
  }
  return res.json({ author: authorWithLists.name, data: authorWithLists.list });
};
const read = async (req, res, next) => {
  const { doc = {} } = req;
  res.json({ data: doc });
};
const update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }
  const { doc = {}, body = {} } = req;
  if (body.author !== null && body.author !== undefined) {
    doc.author = body.author;
  }
  if (body.listName !== null && body.listName !== undefined) {
    doc.listName = body.listName;
  }
  if (body.list !== null && body.list !== undefined) {
    doc.list = body.list;
  }
  try {
    const data = await doc.save();
    return res.json({ data });
  } catch (error) {
    return next(
      new HttpError('Updating data failed, please try again later', 500),
    );
  }
};
const deleteById = async (req, res, next) => {
  const { doc = {} } = req;
  /* try {
    const data = await doc.remove();
    res.json({ data });
  } catch (error) {
    next(error);
  } */

  try {
    const session = await mongoose.startSession();
    let list;
    let listDeleted;
    await session.withTransaction(async () => {
      listDeleted = await List.findById(doc.id)
        .select('-__v')
        .populate({ path: 'author', select: 'name email' });
      list = await List.findByIdAndDelete(doc.id, {
        session,
      })
        .select('-__v')
        .populate({ path: 'author', select: '' });
      /*      authorWithLists = await User.findById(params.userId)
      .select('-__v')
      .populate('list', '-__v'); */
      list.author.list.pull(list);
      await list.author.save({ session });
    });
    await session.endSession();
    return res.json({ listDeleted });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError('Deleting data failed, please try again later', 500),
    );
  }
  /*   try {
    const data = await params.remove();
    return res.json({ data });
  } catch (error) {
    return next(error);
  } */
};

// eslint-disable-next-line object-curly-newline
export { validId, getListByUserId, fetchAll, create, read, update, deleteById };
