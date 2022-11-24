const express = require('express');
const router = express.Router();
const cities = require('../domain/services/service-city');
const comments = require('../domain/services/service-comment');
const places = require('../domain/services/service-place');
const users = require('../domain/services/service-user');

router.get('/cities', cities.GetAll);
router.post('/cities', cities.Create);
router.delete('/cities/:id', cities.Delete);
router.patch('/cities/:id', cities.Update);
router.get('/cities/:id', cities.GetById);
router.get('/cities/city/:name', cities.GetByName);
router.get('/cities/country/:country', cities.GetByCountry);

router.get('/comments', comments.GetAll);
router.post('/comments', comments.Create);
router.delete('/comments/:id', comments.Delete);
router.patch('/comments/:id', comments.Update);
router.get('/comments/author/:authorId', comments.GetByAuthorId);

router.get('/places', places.GetAll);
router.post('/places', places.Create);
router.delete('/places/:id', places.Delete);
router.patch('/places/:id', places.Update);
router.get('/places/:id', places.GetById);
router.get('/places/place/:name', places.GetByName);

router.get('/users', users.GetAll);
router.post('/users', users.Create);
router.delete('/users/:id', users.Delete);
router.patch('/users/:id', users.Update);
router.get('/users/:id', users.GetById);
router.get('/users/user/:name', users.GetByName);

module.exports = router;
