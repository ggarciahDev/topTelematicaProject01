const express = require('express');
const router = express.Router();
const medida = require('../controllers/medida.controller');
const user = require('../controllers/usuario.controller');

//Usuarios
router.post('/register', user.createUser);
router.post('/login', user.userLogin);
router.get('/home', user.userHome);

//Medidas
router.get('/', medida.getMedida);
router.get('/:id', medida.getOneMedida);
router.put('/:id', medida.editMedida);
router.delete('/:id', medida.delMedida);
router.post('/', medida.createMedida);

module.exports = router;