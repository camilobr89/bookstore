const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const booksRouter = require('./booksRoute');
const userRouter = require('./userRoutes');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/', booksRouter);
router.use('/', userRouter);


module.exports = router;
