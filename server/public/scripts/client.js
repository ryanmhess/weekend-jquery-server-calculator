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
    $('#clearEntry-btn').on('click', clearEntryCalc);
    $('#allClear-btn').on('click', allClearCalc);
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
        $('#calcList').empty();
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
        operatorSelection = null;
        fetchCalcHistory();
    } );
}

//-----------------------------------------------------------------------------------------------//
//  CLEAR CALC Function
//-----------------------------------------------------------------------------------------------//

function clearEntryCalc() {
    console.log('clear num1');
    $('#num1').val('');
    console.log('clear num2');
    $('#num2').val('');
    console.log('clear operator');
    operator = null;
    operatorSelection = null;
}

//-----------------------------------------------------------------------------------------------//
//  CLEAR CALC Function - GET
//-----------------------------------------------------------------------------------------------//

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
    })
}