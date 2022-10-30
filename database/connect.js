const express = require('express');
const app = express();
const mongoose = require('mongoose');

function mongoConnect() {
    mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apimongo.vypckgk.mongodb.net/bancoDaAPI?retryWrites=true&w=majority`
        )
        .then(() => {
            console.log('Conectado ao banco de dados com sucesso!');
            app.listen(8888);
        }).catch(err => console.log({DBConnect_err: err}))
}

module.exports = mongoConnect;