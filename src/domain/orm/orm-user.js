//REVISADO OK
const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    /*     return await conn.db.connMongo.City.find().populate('city'); */
    return await conn.db.connMongo.User.find().populate('comments');
  } catch (error) {
    magic.LogDanger('Cannot getAll users', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (
  Name,
  Nickname,
  Email,
  Password,
  Avatar,
  Role,
  Comments
) => {
  try {
    const data = await new conn.db.connMongo.User({
      name: Name,
      nickname: Nickname,
      email: Email,
      password: Password,
      avatar: Avatar,
      role: Role,
      comments: Comments,
    });
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create users', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Delete = async (id) => {
  try {
    return await conn.db.connMongo.User.findByIdAndDelete(id);
  } catch (error) {
    magic.LogDanger('Cannot Delete user', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Update = async (id, user) => {
  try {
    return await conn.db.connMongo.User.findByIdAndUpdate(id, user);
  } catch (error) {
    magic.LogDanger('Cannot Update user', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetById = async (id) => {
  try {
    return await conn.db.connMongo.User.findById(id).populate('comments');
  } catch (error) {
    magic.LogDanger('Cannot get the user by its ID', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByName = async (name) => {
  try {
    return await conn.db.connMongo.User.findOne({ name: name }).populate('comments');
  } catch (error) {
    magic.LogDanger('Cannot get the user by its name', error);
    return await { err: { code: 123, message: error } };
  }
};