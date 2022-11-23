const config = require('config-yml');
const mongoose = require('mongoose');
const magic = require('../../utils/magic');
const city = require('../entities/entity-city');
const comment = require('../entities/entity-comment');
const place = require('../entities/entity-place');
const user = require('../entities/entity-user');
const dotenv = require('dotenv');

dotenv.config();

let db = {};

if (config.db.mongodb && config.db.mongodb.length > 0) {
  config.db.mongodb.map((c) => {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db[c.nameconn] = {};
    db[c.nameconn].conn = mongoose;
    db[c.nameconn].City = city(mongoose);
    db[c.nameconn].Comment = comment(mongoose);
    db[c.nameconn].Place = place(mongoose);
    db[c.nameconn].User = user(mongoose);
  });
  exports.db = db;
  magic.LogInfo('Conectado a la base de datos');
} else {
  magic.LogDanger('No existe la base de datos');
}
