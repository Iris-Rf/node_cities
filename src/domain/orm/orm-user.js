//REVISADO OK
const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    // return await conn.db.connMongo.City.find().populate("city");
    return await conn.db.connMongo.User.find()
  } catch (error) {
    magic.LogDanger('Cannot getAll users', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (name, nickname, email, password, avatar, role, comments) => {
  try {
    const data = await new conn.db.connMongo.User({
    name: name,
    nickname: nickname,
    email: email,
    password: password,
    avatar: avatar,
    role: role,
    comments: comments
    });
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create users', error);
    return await { err: { code: 123, message: error } };
  }
};