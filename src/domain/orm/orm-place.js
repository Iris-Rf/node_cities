//REVISADO OK
const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const { deleteFile } = require('../../middlewares/delete-file');

exports.GetAll = async () => {
  try {
    // return await conn.db.connMongo.City.find().populate("city");
    return await conn.db.connMongo.Place.find().populate('comments');
  } catch (error) {
    magic.LogDanger('Cannot getAll places', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (name, image, comments, req) => {
  try {
    const data = await new conn.db.connMongo.Place({
      name: name,
      image: image,
      comments: comments,
    });
    if (req.file) {
      data.image = req.file.path;
    } else {
      data.image = "there's no image";
    }
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create places', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Delete = async (id) => {
  try {
    const deletedPlace = await conn.db.connMongo.Place.findById(id);
    if (deletedPlace.image) {
      await deleteFile(deletedPlace.image);
    }
    return await conn.db.connMongo.Place.deleteOne({ _id: id });
  } catch (error) {
    magic.LogDanger('Cannot Delete place', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Update = async (id, updatedPlace, req) => {
  try {
    const olderPlace = await conn.db.connMongo.Place.findById(id);
    olderPlace.mapImage && deleteFile(olderCity.mapImage);
    req.file
      ? (updatedPlace.mapImage = req.file.path)
      : (updatedPLace.mapImage = "there's no image");
    return await conn.db.connMongo.Place.findByIdAndUpdate(id, updatedPlace);
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
    return await conn.db.connMongo.Place.findOne({ name: name }).populate(
      'comments'
    );
  } catch (error) {
    magic.LogDanger('Cannot get the place by its name', error);
    return await { err: { code: 123, message: error } };
  }
};
