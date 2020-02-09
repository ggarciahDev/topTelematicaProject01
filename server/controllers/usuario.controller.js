const User = require('../models/user');

const jwt = require('jsonwebtoken');
const config = require('../config');

const userCtrl = {};

userCtrl.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User ({
        name: name,
        email: email,
        password: password
    });
    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });

    res.json({auth: true, token});   
}

userCtrl.userLogin = async (req, res) => {
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

    res.json({auth: true, token });
}

//Este es para traer datos del usuario logueado
userCtrl.userHome = async (req, res) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }

    const decoded = jwt.verify(token, config.secret)

    const user = await User.findById(decoded.id);
    if(!user){
        return res.status(404).send('No user found');
    }

    console.log(decoded);

    res.json(user);
}

module.exports = userCtrl;