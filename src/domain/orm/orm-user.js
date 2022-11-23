//REVISADO OK
const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    // return await conn.db.connMongo.City.find().populate("city");
    return await conn.db.connMongo.User.find();
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
