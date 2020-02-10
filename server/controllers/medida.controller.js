/**
 * Usuario para pruebas:
 * "email": "user@adm.com",
 * "password": "adm",
 */

const Medida = require('../models/medida');
const User = require('../models/user');

const config = require('../config');
const jwt = require('jsonwebtoken');
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

    // Validando usuario    
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(404).send("The email doesn't exists");
    }

    const validPassword = await user.validatePassword(password);
    if(!validPassword){
        return res.status(401).json({auth: false, token: null});
    }

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });

    // Creando medida
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