const magic = require('../../utils/magic');
const enum_ = require('../../utils/enum');
const ormCity = require('../orm/orm-city');
const { deleteFile } = require('../../middlewares/delete-file');

exports.GetAll = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let respOrm = await ormCity.GetAll();
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success GetAll cities'),
        (data = respOrm),
        (statuscode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

// create
exports.Create = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const name = req.body.name;
    const country = req.body.country;
    const population = req.body.population;
    const history = req.body.history;
    const places = req.body.places;

    if (name && country && population && history && places) {
      let respOrm = await ormCity.Create(
        name,
        country,
        population,
        history,
        places,
        req
      );
      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'City created'), (statuscode = enum_.CODE_CREATED);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD),
        (message = 'All fields are required'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

//DELETE
exports.Delete = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const { id } = req.params;

    if (id) {
      let respOrm = await ormCity.Delete(id);
      console.log(respOrm);
      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'City deleted'), (statuscode = enum_.CODE_OK);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD), //este error no cuadra
        (message = 'id does not exist'),
        (statuscode = enum_.CODE_UNPROCESSABLE_ENTITY);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

// Update
exports.Update = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const { id } = req.params;

    const updatedCity = {
      name: req.body.name,
      country: req.body.country,
      population: req.body.population,
      mapImage: req.file.path,
      history: req.body.history,
      places: req.body.places,
      _id: id,
    };

    if (id && updatedCity) {
      let respOrm = await ormCity.Update(id, updatedCity, req);

      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'City updated'), (statuscode = enum_.CODE_OK);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD), //este error no cuadra
        (message = 'id does not exist'),
        (statuscode = enum_.CODE_UNPROCESSABLE_ENTITY);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

//get by id
exports.GetById = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    const { id } = req.params;

    let respOrm = await ormCity.GetById(id);
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success getting the city'),
        (data = respOrm),
        (statuscode = data ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

//get by name
exports.GetByName = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    const { name } = req.params;
    let respOrm = await ormCity.GetByName(name);
    console.log(respOrm);
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success getting the city'),
        (data = respOrm),
        (statuscode = data ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

exports.GetByCountry = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    const { country } = req.params;
    let respOrm = await ormCity.GetByCountry(country);
    console.log(respOrm);
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success getting the city'),
        (data = respOrm),
        (statuscode = data ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};
