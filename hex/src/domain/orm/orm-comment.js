//REVISADO OK
const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.Comment.find().populate('author');
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
      author: author,
    });
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create comment', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Delete = async (id) => {
  try {
    return await conn.db.connMongo.Comment.findByIdAndDelete(id);
  } catch (error) {
    magic.LogDanger('Cannot Delete comment', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Update = async (id, comment) => {
  try {
    return await conn.db.connMongo.Comment.findByIdAndUpdate(id, comment);
  } catch (error) {
    magic.LogDanger('Cannot Update comment', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByAuthorId = async (authorId) => {
  try {
    return await conn.db.connMongo.Comment.find({ author: authorId });
  } catch (error) {
    magic.LogDanger('Cannot Update comment', error);
    return await { err: { code: 123, message: error } };
  }
};
