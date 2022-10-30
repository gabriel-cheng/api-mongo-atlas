const express = require('express');
const app = express();
require('dotenv').config();
const mongoConnect = require('./database/connect');
const PORT = process.env.PORT || 5000;
const router = require('./router/router');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoConnect();

app.use('/', router);
app.use('/', router);
app.use('/:id', router);
app.patch('/:id', router);
app.delete('/:id', router);

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});