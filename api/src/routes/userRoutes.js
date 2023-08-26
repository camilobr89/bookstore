const express = require('express');
const usersController = require('../controllers/userController');

const router = express.Router();

router.post('/users', usersController.create);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);
router.get('/users', usersController.getAll);
router.get('/users/:id', usersController.getById);

module.exports = router;