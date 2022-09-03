const { application } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

let calcHistory = require('./modules/calculations.js');
let newCalc;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded( { extended: true } ));

//-----------------------------------------------------------------------------------------------//
//  GET - /calculation
//-----------------------------------------------------------------------------------------------//

app.get('/calculation', (req, res) => {
    console.log('in GET Server side');
    res.send(calcHistory);
} );

//-----------------------------------------------------------------------------------------------//
//  GET - /emptyHistory
//-----------------------------------------------------------------------------------------------//

app.get('/emptyHistory', (req, res) => {
    calcHistory = [];
    res.send(calcHistory);
} );

//-----------------------------------------------------------------------------------------------//
//  POST - /calculation
//-----------------------------------------------------------------------------------------------//

app.post('/calculation', (req, res) => {
    newCalc = req.body;
    console.log('req body:', newCalc);
    answerCalc();
    res.sendStatus(201);
} );

//-----------------------------------------------------------------------------------------------//
//  ANSWER CALC Function
//-----------------------------------------------------------------------------------------------//

function answerCalc() {
    newCalc.num1 = Number(newCalc.num1);
    newCalc.num2 = Number(newCalc.num2);
    if (newCalc.operator === '+'){
        newCalc.answer = newCalc.num1 + newCalc.num2;
    }
    else if (newCalc.operator === '-'){
        newCalc.answer = newCalc.num1 - newCalc.num2;
    }
    else if (newCalc.operator === '*'){
        newCalc.answer = newCalc.num1 * newCalc.num2;
        newCalc.operator = '&#xd7;';
    }
    else if (newCalc.operator === '/'){
        newCalc.answer = newCalc.num1 / newCalc.num2;
        newCalc.operator = '&#xf7;';
    }
    calcHistory.push(newCalc);
}

//-----------------------------------------------------------------------------------------------//

app.listen(PORT, () => {
    console.log('Server Active', PORT, 'http://localhost:5000/');
} );