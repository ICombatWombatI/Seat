const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const morgan = require('morgan');

const fileUpload = require('express-fileupload');

// Custom Middlewares
//const corsHandler = require('./app/middlewares/cors-handler');
const notFoundHandler = require('./app/middlewares/not-found-handler');
const errorHandler = require('./app/middlewares/error-handler');

// Init App
const app = express();

// Init AdminAPI Routs
const adminAuthRoute = require('./admin_api/routes/auth');
const stadiumRoute = require('./admin_api/routes/stadiums');
const standRoute = require('./admin_api/routes/stands');
const kioskRoute = require('./admin_api/routes/kiosks');
const productRoute = require('./admin_api/routes/products');
const categoryRoute = require('./admin_api/routes/categories');
const orderAuthRoute = require('./admin_api/routes/orders');
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // Middleware чтоб можно было пользоватся bodyparser-ом

// AdminAPI Routs
app.use(fileUpload());
app.use('/admin-api/auth', adminAuthRoute);
app.use('/admin-api/stadiums', stadiumRoute);
app.use('/admin-api/stands', standRoute);
app.use('/admin-api/kiosks', kioskRoute);
app.use('/admin-api/products', productRoute);
app.use('/admin-api/categories',categoryRoute);
app.use('/admin-api/orders', orderAuthRoute);

app.use(notFoundHandler); // Middleware для если страница ненайдена
app.use(errorHandler); // Middleware для обработки ошибки

module.exports = app;