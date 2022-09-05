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
    *   calls valueCalc function when number or decimal button clicked
    *   calls operatorCalc function when operator button clicked
    *   calls equalCalc function when equal button clicked
    *   calls clearEntryCalc when CE button clicked
    *   calls allClearCalc when AC button clicked
*/

function onReady() {
    fetchCalcHistory();
    $('.value').on('click', valueCalc);
    $('.operators').on('click', operatorCalc);
    $('.equal').on('click', equalCalc);
    $('#clearEntry-btn').on('click', clearEntryCalc);
    $('#allClear-btn').on('click', allClearCalc);
}   //  end onReady

//-----------------------------------------------------------------------------------------------//
//  FETCH CALC HISTORY Function - GET
//-----------------------------------------------------------------------------------------------//

/*
    *   sends GET request to server
    *   receives calcHistory array from server
    *   clears all calculation figures from the DOM
    *   resets variable markers
    *   runs array through loop
    *   adds latest calculation figures to the DOM
    *   appends <p></p> for each object in history array
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
                <p>${calc.num1}&nbsp${calc.operator}&nbsp${calc.num2}&nbsp=&nbsp${calc.answer}</p>
            `);
        }
    } );
}   //  end fetchCalcHistory

//-----------------------------------------------------------------------------------------------//
//  VALUE CALC Function
//-----------------------------------------------------------------------------------------------//

/*
    *   checks if this is a new input, if is, clears the calc screens
    *   checks if an equal sign was input 
    *   checks if last input is decimal
    *   if decimal is used, appends input to calc screens and sets the decimal id as empty
    *   if none decimal used, appends input to calc screens
*/

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

/*
    *   checks if this is a new input, if is, clears the calc screens
    *   checks if equal sign or operator inputs were used
    *   function only called after operator input, change operatorUsed to true (prevents multi operators)
    *   operator and num1 variables set
    *   append small screen, clear large screen, decimal id reset
    *   if multi operator clicks present, gives user warning alert
*/

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

/*
    *   checks if an equal sign was input only after an operator was used
    *   sets equalUsed to true, preventing additional value clicks after
    *   calls sendCalc function
*/

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
    *   sends POST request to Server
    *   data sent - object
    *   Server response received
    *   calls fetchCalcHistory function
*/

function sendCalc() {
    $.ajax( {
        method: 'POST',
        url: '/calculation',
        data: {num1, operator, num2, answer}
    } ).then(function(newCalcResponse) {
        console.log(newCalcResponse);
        fetchCalcHistory();
    } );
}   //  end sendCalc

//-----------------------------------------------------------------------------------------------//
//  CLEAR ENTRY CALC Function
//-----------------------------------------------------------------------------------------------//

/*
    *   clears calc screens
    *   resets variable markers
*/

function clearEntryCalc() {
    $('#littleScreen').empty();
    $('#largeScreen').empty();
    decimalUsed = false;
    operatorUsed = false;
    equalUsed = false;
    newInput = true;
}

//-----------------------------------------------------------------------------------------------//
//  ALL CLEAR CALC Function
//-----------------------------------------------------------------------------------------------//

/*
    *   resets variable markers
    *   sends a DELETE request to server
    *   received empty array
    *   sets calc variables to null
    *   calls fetchCalcHistory function
*/

function allClearCalc() {
    decimalUsed = false;
    operatorUsed = false;
    equalUsed = false;
    newInput = true;
    $.ajax( {
        method: 'DELETE',
        url: '/calculation'
    } ).then(function(emptyResponse) {
        console.log(emptyResponse);
        num1 = null;
        operator = null;
        num2 = null;
        answer = null;
        fetchCalcHistory();
    } );
}

//  The End - Client