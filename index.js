const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

// SETTINGS ----------------------------------------------------------------------------------------------------
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// MIDDLEWARES ----------------------------------------------------------------------------------------------------
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// ROUTES ----------------------------------------------------------------------------------------------------
app.use(require('./routes'));

// 404 HANDLER ----------------------------------------------------------------------------------------------------
app.use((req, res, next) => {
    res.status(404).send('404 Not found');
});

app.listen(process.env.PORT || 888, () => {
    console.log(`Server running on port ${process.env.PORT || 888}`)
});
