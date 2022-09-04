const { application } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

let calcHistory = require('./modules/calculations.js');
let newCalc;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded( { extended: true } ));

//-----------------------------------------------------------------------------------------------//
//  GET - /calculation
//-----------------------------------------------------------------------------------------------//

/*
    *   accepts GET request from the client
    *   sends calcHistory array back to client
*/

app.get('/calculation', (req, res) => {
    console.log(calcHistory);
    res.send(calcHistory);
} );

//-----------------------------------------------------------------------------------------------//
//  GET - /emptyHistory
//-----------------------------------------------------------------------------------------------//

/*
    *   accepts GET request from the client
    *   sets calcHistory to an empty array
    *   sends calcHistory array back to client
*/

app.delete('/calculation', (req, res) => {
    calcHistory = [];
    res.sendStatus(201);
} );

//-----------------------------------------------------------------------------------------------//
//  POST - /calculation
//-----------------------------------------------------------------------------------------------//

/*
    *   accepts an object from the client
    *   sets object to newCalc variable
    *   calls answerCalc function
    *   sends confirmation back to client
*/

app.post('/calculation', (req, res) => {
    newCalc = req.body;
    console.log('req body:', newCalc);
    answerCalc();
    res.sendStatus(201);
} );

//-----------------------------------------------------------------------------------------------//
//  ANSWER CALC Function
//-----------------------------------------------------------------------------------------------//

/*
    *   modifies the newCalc object received from client
    *   sets newCalc.num1 and newCalc.num2 to Number variables
    *   determines operator and performs calculation
    *   pushes updated object to calcHistory array
*/

function answerCalc() {
    newCalc.num1 = Number(newCalc.num1);
    newCalc.num2 = Number(newCalc.num2);
    if (newCalc.operator === '+'){
        newCalc.answer = newCalc.num1 + newCalc.num2;
    }
    else if (newCalc.operator === '-'){
        newCalc.answer = newCalc.num1 - newCalc.num2;
    }
    else if (newCalc.operator === '×'){
        newCalc.answer = newCalc.num1 * newCalc.num2;
        newCalc.operator = '×';
    }
    else if (newCalc.operator === '÷'){
        newCalc.answer = newCalc.num1 / newCalc.num2;
        newCalc.operator = '÷';
    }
    calcHistory.push(newCalc);
}

//-----------------------------------------------------------------------------------------------//

app.listen(PORT, () => {
    console.log('Server Active', PORT, 'http://localhost:5000/');
} );

//  The End - Server