//REVISADO OK
const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    // return await conn.db.connMongo.City.find().populate("city");
    return await conn.db.connMongo.Place.find().populate('comments');
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
      comments: comments,
    });
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create places', error);
    return await { err: { code: 123, message: error } };
  }
}

exports.Delete = async (id) => {
  try {
    return await conn.db.connMongo.Place.findByIdAndDelete(id);
  } catch (error) {
    magic.LogDanger('Cannot Delete place', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Update = async (id, place) => {
  try {
    return await conn.db.connMongo.Place.findByIdAndUpdate(id, place);
  } catch (error) {
    magic.LogDanger('Cannot Update place', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetById = async (id) => {
  try {
    return await conn.db.connMongo.Place.findById(id).populate('comments');
  } catch (error) {
    magic.LogDanger('Cannot get the place by its ID', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByName = async (name) => {
  try {
    return await conn.db.connMongo.Place.findOne({ name: name }).populate('comments');
  } catch (error) {
    magic.LogDanger('Cannot get the place by its name', error);
    return await { err: { code: 123, message: error } };
  }
};

