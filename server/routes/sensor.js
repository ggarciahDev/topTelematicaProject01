const express = require('express');
const router = express.Router();
const medida = require('../controllers/medida.controller');

router.get('/', medida.getMedida);
router.get('/:id', medida.getOneMedida);
router.put('/:id', medida.editMedida);
router.delete('/:id', medida.delMedida);
router.post('/', medida.createMedida);

module.exports = router;