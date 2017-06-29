$(document).ready(function(){
    $(function() {
        $('.currency').maskMoney();
    });

    $('#formCalculadora').submit(function () {
       alert('fará o cálculo');

       return false;
    });
});

