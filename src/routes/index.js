const express = require('express');
const indexController = require('../controllers/index-controller');
const  user = require("../controllers/user-controller.js");
const recicle = require("../controllers/recicle-controller.js");
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

// index
router.get('/', indexController);

router.post('/cadastrar', user.cadastrarCliente);
router.post('/login', user.login);

router.use(authMiddleware);
router.post('/recicle', recicle.adicionarProdutos);

module.exports = router;
