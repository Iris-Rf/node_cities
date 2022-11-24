// REVISADO OK
const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    // return await conn.db.connMongo.City.find().populate("city");
    return await conn.db.connMongo.City.find().populate('places');
  } catch (error) {
    magic.LogDanger('Cannot getAll cities', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (
  name,
  country,
  population,
  mapImage,
  history,
  places
) => {
  try {
    const data = await new conn.db.connMongo.City({
      name: name,
      country: country,
      population: population,
      mapImage: mapImage,
      history: history,
      places: places,
    });
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create city', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Delete = async (id) => {
  try {
    /* const id = data._id; */
    return await conn.db.connMongo.City.findByIdAndDelete(id);
  } catch (error) {
    magic.LogDanger('Cannot Delete city', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Update = async (id, city) => {
  try {
    return await conn.db.connMongo.City.findByIdAndUpdate(id, city);
  } catch (error) {
    magic.LogDanger('Cannot Update city', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetById = async (id) => {
  try {
    return await conn.db.connMongo.City.findById(id).populate('places');
  } catch (error) {
    magic.LogDanger('Cannot get the city', error);
    return await { err: { code: 123, message: error } };
  }
};
