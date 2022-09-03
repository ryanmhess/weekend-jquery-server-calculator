console.log('js');

$(document).ready(onReady);

function onReady() {
    fetchCalculations();
}

function fetchCalculations(){
    console.log('in GET Client side');
    $.ajax( {
        type: 'GET',
        url: '/calculation'
    } ).then(function(calcHistResponse) {
        console.log('info GOT from Server now in Client');
        console.log(calcHistResponse);
    } );
}