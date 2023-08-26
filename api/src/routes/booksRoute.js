const express = require('express');
const BooksController = require('../controllers/booksController'); 

const router = express.Router();

router.post('/libros', BooksController.create);
router.put('/libros/:id', BooksController.update);
router.delete('/libros/:id', BooksController.delete);
router.get('/libros', BooksController.getAll);
router.get('/libros/:id', BooksController.getById);

module.exports = router;
