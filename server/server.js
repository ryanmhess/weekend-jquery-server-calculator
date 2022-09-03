const { application } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

const calcHistory = require('./modules/calculations.js');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded( { extended: true } ));

app.get('/calculation', (req, res) => {
    console.log('in GET Server side');
    res.send(calcHistory);
} );

app.listen(PORT, () => {
    console.log('Server Active', PORT, 'http://localhost:5000/');
} );