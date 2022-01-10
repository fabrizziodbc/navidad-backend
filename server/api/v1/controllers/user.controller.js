import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import HttpError from '../models/http.error.model.js';
import List from '../models/list.model.js';
import User from '../models/user.model.js';

const validId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await User.findById(id)
      .select('-__v')
      .populate('list', 'listName');
    if (!data) {
      const message = `${User.name} not found`;
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
    const data = await User.find({})
      .select('-password -__v')
      .populate('list', 'listName');
    res.json({ data });
  } catch (error) {
    next(new HttpError('Fetching users failed, please try again later', 500));
  }
};

// fetchByEmail
const fetchByEmail = async (req, res, next) => {
  try {
    const data = await User.findOne({ email: req })
      .select('-__v')
      .populate('list', 'listName');
    return data;
  } catch (error) {
    return next(
      new HttpError('Fetching user failed, please try again later', 500),
    );
  }
};
//

const create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }
  const { body = {} } = req;
  body.password = await bcrypt.hash(body.password, 10);
  let existingUser;
  try {
    existingUser = await User.findOne({ email: body.email });
    console.log('existing', existingUser);
  } catch (error) {
    return next(
      new HttpError('Singing up failed, please try again later', 500),
    );
  }
  if (existingUser) {
    return next(new HttpError('User already exists, login instead', 404));
  }
  const newDocument = new User(body);
  try {
    const data = await newDocument.save();
    const newData = JSON.parse(JSON.stringify(data));
    delete newData.password;
    const status = 201;
    return res.status(status).json({ newData });
  } catch (error) {
    return next(
      new HttpError('Singing up failed, please try again later', 500),
    );
  }
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
  if (body.name !== null && body.name !== undefined) {
    doc.name = body.name;
  }
  if (body.email !== null && body.email !== undefined) {
    doc.email = body.email;
  }
  if (body.password !== null && body.password !== undefined) {
    doc.password = body.password;
  }
  try {
    console.log('doc', doc);
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
  try {
    await List.deleteMany({ author: doc.id });
    const data = await doc.remove();
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

// eslint-disable-next-line object-curly-newline
export { validId, fetchAll, create, read, update, deleteById, fetchByEmail };
