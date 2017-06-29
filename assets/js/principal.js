$(document).ready(function(){
    $(function() {
        $('.currency').maskMoney();
    });

    $('#formCalculadora').submit(function () {
        //Insiro dados nas variáveis
       var rendimentos_bancarios = $('#rendimentos_bancario').val();
       var rendimentos_salario = $('#rendimentos_salario').val();
       var gastos_medicos = $('#gastos_medicos').val();
       var gastos_educacionais = $('#gastos_educacionais').val();
       var outros = $('#outros').val();

       //Valida os campos de forma simples
       if(rendimentos_bancarios == ''){
           alert('Preencha o campo de rendimentos Bancários');
           return false;
       }

        if(rendimentos_salario == ''){
            alert('Preencha o campo de Salários ');
            return false;
        }


        if(gastos_medicos == null || gastos_educacionais == null){
            alert('Preencha o campo de preencha ao menos um tipo de gasto');
            return false;
        }

        //Calcula os rendimentos Bancários
        var total_rendimentos_bancario = calcRendimentosBancarios(rendimentos_bancarios);
        var total_rendimentos_salario = calcRendimentosSalario(rendimentos_salario);
        var total_outros_rendimentos = calcOutrosRendimentos(outros);

        var total = (+total_rendimentos_bancario + +total_outros_rendimentos + +total_rendimentos_salario);


        //Popula todos os campos laterais
        $('#total_rendimentos_bancario').text(formataValor(total_rendimentos_bancario));
        $('#total_rendimentos_salario').text(formataValor(total_rendimentos_salario));
        $('#total_outros').text(formataValor(total_outros_rendimentos));
        $('#total, #imposto_bruto').text(formataValor(total));

        $('#max_abatimento, #abatimentos').text(formataValor(calcAbatServicos(total)));


        $('#total_final').text(formataValor(+total - +calcAbatServicos(total)));


        $('#poss_abatimento_med').text(formataValor(parseFloat(gastos_medicos)));
        $('#poss_abatimento_educacional').text(formataValor(parseFloat(gastos_educacionais.replace(',', ''))));
        $('#poss_abatimento_total').text(formataValor(+parseFloat(gastos_medicos.replace(',', '')) + +parseFloat(gastos_educacionais.replace(',', ''))));


       return false;
    });
});

/**
 * Calcula os rendimentos bancários
 * @param rendimentos_bancarios
 * @returns {*}
 */
function calcRendimentosBancarios(rendimentos_bancarios) {
    rendimentos_bancarios = rendimentos_bancarios.replace(',', '');
    var porcRendimentosBancarios = parseFloat(rendimentos_bancarios * 20 / 100);
    return parseFloat(porcRendimentosBancarios);
}

/**
 * Calcula gastos que tenham 10% de imposto
 * @param outros_rendimentos
 * @returns {Number}
 */
function calcOutrosRendimentos(outros_rendimentos) {
    outros_rendimentos = outros_rendimentos.replace(',', '');
    var porcRendimentosBancarios = parseFloat(outros_rendimentos * 10 / 100);
    return parseFloat(porcRendimentosBancarios);
}

/**
 * Calcula imposto sobre o salário e serviços considerando a regra da porcentagem para o mesmo
 * @param rendimentos_salario
 * @returns {string}
 */
function calcRendimentosSalario(rendimentos_salario) {
    rendimentos_salario = Number(rendimentos_salario.replace(',', ""));
    console.log(rendimentos_salario);
    var porcentagem = '';
    if(rendimentos_salario > "0" && rendimentos_salario <= "8000") {
        console.log('1');
        porcentagem = 0;
    }else if(rendimentos_salario >= "8000" && rendimentos_salario <= "24000"){
        console.log('2');
        porcentagem = 15;
    }else{
        console.log('3');
        porcentagem = 20;
    }

    var porcRendimentosSalario = parseFloat(rendimentos_salario * porcentagem / 100);
    return parseFloat(porcRendimentosSalario);
}


function calcAbatServicos(total) {
    var porcAbatimento = parseFloat(total * 30 / 100);
    return parseFloat(porcAbatimento);
}

/**
 * Classe formata o valor
 * @param total
 * @returns {string}
 */
function formataValor(total) {
    var neg = false;
    if(total < 0) {
        neg = true;
        total = Math.abs(total);
    }
    return (neg ? "R$ -" : 'R$ ') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}

