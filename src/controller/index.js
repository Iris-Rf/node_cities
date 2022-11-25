const express = require('express');
const router = express.Router();
const cities = require('../domain/services/service-city');
const comments = require('../domain/services/service-comment');
const places = require('../domain/services/service-place');
const users = require('../domain/services/service-user');
const { isAuth } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/admin.middleware');
const { upload } = require('../middlewares/file');

router.get('/cities', cities.GetAll);
router.post('/cities', [isAdmin], upload.single('mapImage'), cities.Create);
router.delete('/cities/:id', [isAdmin], cities.Delete);
router.patch('/cities/:id', [isAdmin], cities.Update);
router.get('/cities/:id', cities.GetById);
router.get('/cities/city/:name', cities.GetByName);
router.get('/cities/country/:country', cities.GetByCountry);

router.get('/comments', comments.GetAll);
router.post('/comments', [isAuth], comments.Create);
router.delete('/comments/:id', [isAuth], comments.Delete);
router.patch('/comments/:id', [isAuth], comments.Update);
router.get('/comments/author/:authorId', comments.GetByAuthorId);

router.get('/places', places.GetAll);
router.post('/places', [isAdmin], places.Create);
router.delete('/places/:id', [isAdmin], places.Delete);
router.patch('/places/:id', [isAdmin], places.Update);
router.get('/places/:id', places.GetById);
router.get('/places/place/:name', places.GetByName);

router.get('/users', [isAdmin], users.GetAll);
router.post('/users', users.Create);
router.delete('/users/:id', [isAdmin], users.Delete);
router.patch('/users/:id', [isAuth], users.Update);
router.get('/users/:id', [isAdmin], users.GetById);
router.get('/users/user/:name', [isAdmin], users.GetByName);
router.post('/users/user/login', users.Login);

module.exports = router;
