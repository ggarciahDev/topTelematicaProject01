const Medida = require('../models/medida');

const medidaCtrl = {};

medidaCtrl.getMedida = async (req, res) => {
    const medidas = await Medida.find();
    res.json(medidas);
}

medidaCtrl.getOneMedida = async (req, res) => {
    const medida = await Medida.findById(req.params.id);
    res.json(medida);
}

medidaCtrl.editMedida = async (req, res) => {
    const medida = {
        nameSensor: req.body.nameSensor,
        temp: req.body.temp,
        hum: req.body.hum
    }
    await Medida.findByIdAndUpdate(req.params.id, {$set: medida});
    res.json({'Status' : 'medida actualizada'});
}

medidaCtrl.createMedida = async (req, res) => {
    const medida = new Medida({
        nameSensor: req.body.nameSensor,
        temp: req.body.temp,
        hum: req.body.hum
    });
    await medida.save();
    res.json({
        'Status' : 'medida guardada'
    });
}

medidaCtrl.delMedida = async (req, res) => {
    await Medida.findByIdAndRemove(req.params.id);
    res.json({Status: 'la medida ha sido asesinada'});
}

module.exports = medidaCtrl;