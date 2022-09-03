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
    $('.value').on('click', numberFunction);
    $('.operators').on('click', operatorFunction);
    $('.equal').on('click', equalFunction);
    // $('.operators').on('click', operatorCalc);
    // $('#equal-btn').on('click', sendCalc);
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

        let lastCalc = calcHistResponse[calcHistResponse.length - 1];
        $('#littleScreen').append(lastCalc.num1, ' ', lastCalc.operator, ' ', lastCalc.num2, '=');
        $('#largeScreen').append(lastCalc.answer);

        for (let calc of calcHistResponse) {
            $('#calcList').append(`
                <li>${calc.num1}&nbsp${calc.operator}&nbsp${calc.num2}&nbsp=&nbsp${calc.answer}</li>
            `);
        }
    } );
}   //  end fetchCalcHistory

//-----------------------------------------------------------------------------------------------//
//  TEST AREA - NUMBER FUNCTION
//-----------------------------------------------------------------------------------------------//

function numberFunction() {
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
//  TEST AREA - OPERATOR FUNCTION
//-----------------------------------------------------------------------------------------------//

function operatorFunction() {
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
//  TEST AREA - EQUAL FUNCTION
//-----------------------------------------------------------------------------------------------//

function equalFunction() {
    if (equalUsed === false && operatorUsed === true) {
        equalUsed = true;
        num2 = $('#largeScreen').text();
    }
    newInput = false;
    sendCalc();
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
    answer = null;
    $.ajax( {
        method: 'POST',
        url: '/calculation',
        data: {num1, operator, num2, answer}
    } ).then(function(newCalcResponse) {
        fetchCalcHistory();
    } );
}   //  end sendCalc

//-----------------------------------------------------------------------------------------------//
//  TEST AREA
//-----------------------------------------------------------------------------------------------//

// function numberFunction() {
//     if (newInput === false) {
//         $('#littleScreen').empty();
//         $('#largeScreen').empty();
//         newInput = true;
//     }
//     if (equalUsed === false) {
//         if($(this).attr('id') === '.') {
//             $('#littleScreen').append($(this).attr('id'));
//             $('#largeScreen').append($(this).attr('id'));
//             $(this).attr('id', '');
//         }
//         $('#littleScreen').append($(this).attr('id'));
//         $('#largeScreen').append($(this).attr('id'));
//     }
// }

// //-----------------------------------------------------------------------------------------------//
// //  TEST AREA
// //-----------------------------------------------------------------------------------------------//

// function operatorFunction() {
//     if (equalUsed === false && operatorUsed === false) {
//         operatorUsed = true;
//         operator = $(this).attr('id');
//         num1 = $('#largeScreen').text();
//         $('#littleScreen').append(' ', $(this).attr('id'), ' ');
//         $('#largeScreen').empty();
//         $('.decimal').attr('id', '.');
//     }
//     else if (operatorUsed === true) {
//         alert('Operator Limit Reached');
//     }
// }

// //-----------------------------------------------------------------------------------------------//
// //  TEST AREA
// //-----------------------------------------------------------------------------------------------//

// function equalFunction() {
//     if (equalUsed === false && operatorUsed === true) {
//         equalUsed = true;
//         num2 = $('#largeScreen').text();
//         // $('#littleScreen').append(' ', $(this).attr('id'));
//         // $('#littleScreen').empty();
//         // $('#largeScreen').empty();
//     }
//     newInput = false;
//     sendCalc();
// }

//  The End - Client


//-----------------------------------------------------------------------------------------------//
//  OPERATOR CALC Function
//-----------------------------------------------------------------------------------------------//

/*
    *   if operatorSelection has been selected, returns alert
    *   operatorSelection set to last operator button clicked
    *   based on operator button clicked, sets operator variable accordingly
*/

// function operatorCalc() {
//     if (operatorSelection){
//         return alert('Operator Limit Reached');
//     }
//     operatorSelection = $(this).attr('id');
//     if (operatorSelection === 'addition-btn') {
//         operator = '+';
//     }
//     else if (operatorSelection === 'subtraction-btn') {
//         operator = '-';
//     }
//     else if (operatorSelection === 'multiplication-btn') {
//         operator = '*';
//     }
//     else if (operatorSelection === 'division-btn') {
//         operator = '/';
//     }
// }   //  end operatorCalc

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

// function allClearCalc() {
//     $('#num1').val('');
//     $('#num2').val('');
//     operator = null;
//     operatorSelection = null;
//     $.ajax( {
//         type: 'GET',
//         url: '/emptyHistory'
//     }).then(function(emptyHistoryResponse) {
//         fetchCalcHistory();
//     });
// }   //  end allClearCalc

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

// function allClearCalc() {
//     $('#num1').val('');
//     $('#num2').val('');
//     operator = null;
//     operatorSelection = null;
//     $.ajax( {
//         type: 'GET',
//         url: '/emptyHistory'
//     }).then(function(emptyHistoryResponse) {
//         fetchCalcHistory();
//     });
// }   //  end allClearCalc