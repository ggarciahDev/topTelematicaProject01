// 1) Ejecutar el Mongod
// 2) Ejecutar el comando -> npm run dev

const mongoose = require('mongoose');
const db = 'mongodb://localhost/dbcentral'

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is coneccted'))
    .catch(err => console.error(err));

module.exports = mongoose;