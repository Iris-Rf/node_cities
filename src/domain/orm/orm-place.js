//REVISADO OK
const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    // return await conn.db.connMongo.City.find().populate("city");
    return await conn.db.connMongo.Place.find()
  } catch (error) {
    magic.LogDanger('Cannot getAll places', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (name, image, comments) => {
  try {
    const data = await new conn.db.connMongo.Place({
     name: name,
     image: image,
     comments: comments
    });
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create places', error);
    return await { err: { code: 123, message: error } };
  }
};