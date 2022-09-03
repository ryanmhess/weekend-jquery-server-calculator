console.log('js');

let num1 = null;
let operator = null;
let num2 = null;
let answer = null;

let decimalUsed = false;
let operatorUsed = false;
let equalUsed = false;
let newInput = true;

$(document).ready(onReady);

//-----------------------------------------------------------------------------------------------//
//  ON READY Function
//-----------------------------------------------------------------------------------------------//

/*
    *   calls fetchCalcHistory function
    *   calls operatorCalc function when operator button clicked
    *   calls sendCalc function when equal button clicked
    *   calls clearEntryCalc when CE button clicked
    *   calls allClearCalc when AC button clicked
*/

function onReady() {
    fetchCalcHistory();
    $('.value').on('click', valueCalc);
    $('.operators').on('click', operatorCalc);
    $('.equal').on('click', equalCalc);
    // $('#clearEntry-btn').on('click', clearEntryCalc);
    // $('#allClear-btn').on('click', allClearCalc);
}   //  end onReady

//-----------------------------------------------------------------------------------------------//
//  FETCH CALC HISTORY Function - GET
//-----------------------------------------------------------------------------------------------//

/*
    *   clears out num1 input window
    *   clears out num2 input window
    *   sends GET request to server
    *   receives calcHistory array from server
    *   runs array through loop
    *   appends li for each object in array
*/

function fetchCalcHistory(){
    $.ajax( {
        type: 'GET',
        url: '/calculation'
    } ).then(function(calcHistResponse) {
        $('#littleScreen').empty();
        $('#largeScreen').empty();
        $('#calcList').empty();
        decimalUsed = false;
        operatorUsed = false;
        equalUsed = false;
        newInput = true;
        let lastCalc = calcHistResponse[calcHistResponse.length - 1];
        $('#littleScreen').append(lastCalc.num1, ' ', lastCalc.operator, ' ', lastCalc.num2, ' =');
        $('#largeScreen').append(String(lastCalc.answer));
        for (let calc of calcHistResponse) {
            $('#calcList').append(`
                <li>${calc.num1}&nbsp${calc.operator}&nbsp${calc.num2}&nbsp=&nbsp${calc.answer}</li>
            `);
        }
    } );
}   //  end fetchCalcHistory

//-----------------------------------------------------------------------------------------------//
//  VALUE CALC Function
//-----------------------------------------------------------------------------------------------//

function valueCalc() {
    if (newInput === true) {
        $('#littleScreen').empty();
        $('#largeScreen').empty();
        newInput = false;
    }
    if (equalUsed === false) {
        if($(this).attr('id') === '.') {
            $('#littleScreen').append($(this).attr('id'));
            $('#largeScreen').append($(this).attr('id'));
            $(this).attr('id', '');
        }
        $('#littleScreen').append($(this).attr('id'));
        $('#largeScreen').append($(this).attr('id'));
    }
}

//-----------------------------------------------------------------------------------------------//
//  OPERATOR CALC Function
//-----------------------------------------------------------------------------------------------//

function operatorCalc() {
    if (newInput === true) {
        $('#littleScreen').empty();
        $('#largeScreen').empty();
        newInput = false;
    }
    if (equalUsed === false && operatorUsed === false) {
        operatorUsed = true;
        operator = $(this).attr('id');
        num1 = $('#largeScreen').text();
        $('#littleScreen').append(' ', $(this).attr('id'), ' ');
        $('#largeScreen').empty();
        $('.decimal').attr('id', '.');
    }
    else if (operatorUsed === true) {
        alert('Operator Limit Reached');
    }
}

//-----------------------------------------------------------------------------------------------//
//  EQUAL CALC Function
//-----------------------------------------------------------------------------------------------//

function equalCalc() {
    if (equalUsed === false && operatorUsed === true) {
        equalUsed = true;
        num2 = $('#largeScreen').text();
        newInput = false;
        sendCalc();
    }
}

//-----------------------------------------------------------------------------------------------//
//  SEND CALC Function - POST
//-----------------------------------------------------------------------------------------------//

/*
    *   sets num1 and num2 variables to associated input window values
    *   sets answer to null
    *   sends POST request to Server
    *   data sent - object
    *   Server response received
    *   operatorSelection set to null
    *   calls fetchCalcHistory function
*/

function sendCalc() {
    $.ajax( {
        method: 'POST',
        url: '/calculation',
        data: {num1, operator, num2, answer}
    } ).then(function(newCalcResponse) {
        fetchCalcHistory();
    } );
}   //  end sendCalc

//  The End - Client