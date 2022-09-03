console.log('js');

let answer = null;
let operator;
let operatorSelection;

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
    $('.operators').on('click', operatorCalc);
    $('#equal-btn').on('click', sendCalc);
    $('#clearEntry-btn').on('click', clearEntryCalc);
    $('#allClear-btn').on('click', allClearCalc);
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
    $('#num1').val('');
    $('#num2').val('');
    $.ajax( {
        type: 'GET',
        url: '/calculation'
    } ).then(function(calcHistResponse) {
        console.log('info GOT from Server now in Client');
        console.log(calcHistResponse);
        $('#calcList').empty();
        for (let calc of calcHistResponse) {
            $('#calcList').append(`
                <li>${calc.num1}&nbsp${calc.operator}&nbsp${calc.num2}&nbsp=&nbsp${calc.answer}</li>
            `);
        }
    } );
}   //  end fetchCalcHistory

//-----------------------------------------------------------------------------------------------//
//  OPERATOR CALC Function
//-----------------------------------------------------------------------------------------------//

/*
    *   if operatorSelection has been selected, returns alert
    *   operatorSelection set to last operator button clicked
    *   based on operator button clicked, sets operator variable accordingly
*/

function operatorCalc() {
    if (operatorSelection){
        return alert('Operator Limit Reached');
    }
    operatorSelection = $(this).attr('id');
    if (operatorSelection === 'addition-btn') {
        operator = '+';
    }
    else if (operatorSelection === 'subtraction-btn') {
        operator = '-';
    }
    else if (operatorSelection === 'multiplication-btn') {
        operator = '*';
    }
    else if (operatorSelection === 'division-btn') {
        operator = '/';
    }
}   //  end operatorCalc

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
    let num1 = $('#num1').val();
    let num2 = $('#num2').val();
    answer = null;
    $.ajax( {
        method: 'POST',
        url: '/calculation',
        data: {num1, operator, num2, answer}
    } ).then(function(newCalcResponse) {
        operatorSelection = null;
        fetchCalcHistory();
    } );
}   //  end sendCalc

//-----------------------------------------------------------------------------------------------//
//  CLEAR CALC Function
//-----------------------------------------------------------------------------------------------//

/*
    *   clears num1 and num2 input windows
    *   operator and operatorSelection set to null
*/

function clearEntryCalc() {
    $('#num1').val('');
    $('#num2').val('');
    operator = null;
    operatorSelection = null;
}   //  end clearEntryCalc

//-----------------------------------------------------------------------------------------------//
//  CLEAR CALC Function - GET
//-----------------------------------------------------------------------------------------------//

/*
    *   clears num1 and num2 input windows
    *   operator and operatorSelection set to null
    *   sends GET request to Server
    *   Server response received
    *   calls fetchCalcHistory function
*/

function allClearCalc() {
    $('#num1').val('');
    $('#num2').val('');
    operator = null;
    operatorSelection = null;
    $.ajax( {
        type: 'GET',
        url: '/emptyHistory'
    }).then(function(emptyHistoryResponse) {
        fetchCalcHistory();
    });
}   //  end allClearCalc

//  The End - Client