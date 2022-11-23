//REVISADO OK
const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    // return await conn.db.connMongo.City.find().populate("city");
    return await conn.db.connMongo.Comment.find()
  } catch (error) {
    magic.LogDanger('Cannot getAll comments', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (title, text, author) => {
  try {
    const data = await new conn.db.connMongo.Comment({
     title: title,
     text: text,
     author: author
    });
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create comment', error);
    return await { err: { code: 123, message: error } };
  }
};