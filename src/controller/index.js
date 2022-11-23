const express = require('express');
const router = express.Router();
const cities = require('../domain/services/service-city');
const comments = require('../domain/services/service-comment');
const places = require('../domain/services/service-place');
const users = require('../domain/services/service-user');


router.get('/cities', cities.GetAll);
router.post('/cities', cities.Create);
router.get('/comments', comments.GetAll);
router.post('/comments', comments.Create);
router.get('/places', places.GetAll);
router.post('/places', places.Create);
router.get('/users', users.GetAll);
router.post('/users', users.Create);



module.exports = router;