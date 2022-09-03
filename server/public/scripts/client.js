console.log('js');

let answer = null;
let operator;
let operatorSelection;

$(document).ready(onReady);

//-----------------------------------------------------------------------------------------------//
//  ON READY Function
//-----------------------------------------------------------------------------------------------//

function onReady() {
    fetchCalcHistory();
    $('.operators').on('click', operatorCalc);
    $('#equal-btn').on('click', sendCalc);
    // $('#clear-btn').on('click', clearCalc);
}

//-----------------------------------------------------------------------------------------------//
//  FETCH CALC HISTORY Function - GET
//-----------------------------------------------------------------------------------------------//

function fetchCalcHistory(){
    console.log('in GET Client side');
    $('#num1').val('');
    $('#num2').val('');
    $.ajax( {
        type: 'GET',
        url: '/calculation'
    } ).then(function(calcHistResponse) {
        console.log('info GOT from Server now in Client');
        console.log(calcHistResponse);
        for (let calc of calcHistResponse) {
            $('#calcList').append(`
                <li>${calc.num1}&nbsp${calc.operator}&nbsp${calc.num2}&nbsp=&nbsp${calc.answer}</li>
            `)
        }
    } );
}

//-----------------------------------------------------------------------------------------------//
//  OPERATOR CALC Function
//-----------------------------------------------------------------------------------------------//

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
    console.log(operator);
}

//-----------------------------------------------------------------------------------------------//
//  SEND CALC Function - POST
//-----------------------------------------------------------------------------------------------//

function sendCalc() {
    let num1 = $('#num1').val();
    let num2 = $('#num2').val();
    answer = null;
    $.ajax( {
        method: 'POST',
        url: '/calculation',
        data: {num1, operator, num2, answer}
    } ).then(function(newCalcResponse) {
        fetchCalcHistory();
    } );
}

//-----------------------------------------------------------------------------------------------//
//  CLEAR CALC Function
//-----------------------------------------------------------------------------------------------//

// function clearCalc() {
//     console.log('clear num1');
//     $('#num1').val('');
//     console.log('clear num2');
//     $('#num2').val('');
//     console.log('clear operator');
//     operator = '';
// }