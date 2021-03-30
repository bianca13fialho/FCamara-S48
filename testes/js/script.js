window.onload = function () {
    //var valorEstados = ['Rio de Janeiro', 'São Paulo'];
    var valorMateriais = ['Lápis de Cor - 12 Cores', 'Lápis de Cor - 24 Cores', 'Caneta Esferográfica Azul ou Preta',
        'Caneta Esferográfica Azul ou Preta', 'Caneta Esferográfica Vermelha', 'Lápis Preto', 'Cola Líquida',
        'Tesoura sem Ponta', 'Cola Bastão', 'Borracha', 'Apontador', 'Régua', 'Caderno Universtário', 'Caderno de 20 materias',
        'Mochila Escolar', 'Alcool em Gel', 'Agenda'];


    endereco = document.getElementById("enderecoEscola");
    var materiais = document.getElementById("materiais");
    var $cep = $(".cep");

    selectEstado = document.getElementById("estado");
    selectCidade = document.getElementById("cidade");

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
        .then(res => res.json())
        .then(data => selecionarCidadesEstados(data))


    var $estado = $(".estado");



    //cepFormat.split('-').join('');

    $cep.change(function () {
        cepVal = $cep.val();
        var $argu = cepVal.split('.').join('');
        $argu = $argu.split('-').join('');

        console.log($argu);
        fetch(`https://viacep.com.br/ws/${$argu}/json/`)
            .then(res => res.json())
            .then(info => pegaCep(info))

        function pegaCep(infos) {
            if (infos.logradouro != null) {
                endereco.setAttribute('placeholder', '');
                endereco.value = infos.logradouro;
            }else{
                console.log("CEP não encontrado");
            }



        }

    });
    function selecionarCidadesEstados(infos) {

        $estado.select2();
        $estado.html(function () {
            let opcoes = '<option value="" selected></option>';
            infos.forEach(info => {

                opcoes += `<option value="${info.id}">${info.nome}</option>`;

            }
            );
            return opcoes;
        });
        var $cidade = $(".cidade").select2();
        $estado.change(function () {

            //selectCidade.disabled = false;
            var seleci = $estado.val();
            console.log(seleci);
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${seleci}/municipios`)
                .then(res => res.json())
                .then(data2 => foda(data2))

            function foda(infos) {

                $cidade.prop('disabled', false);
                $cidade.html(function () {
                    let opcoes = '<option value="" selected></option>';
                    infos.forEach(info => {

                        opcoes += `<option value="${info.id}">${info.nome}</option>`;

                    }
                    );
                    return opcoes;
                });


            }
        });

    }




    for (var i = 0; i < valorMateriais.length; i++) {
        materiais.innerHTML += `<input type="checkbox" id="${valorMateriais[i]}" name="material">
        <label for="${valorMateriais[i]}"> ${valorMateriais[i]} </label> <br>`
    }
    /*
    for(var i = 0; i< valorEstados.length; i++){
        selectEstado.innerHTML += `<option name="estado">${valorEstados[i]}</option>`;
 
 
    }
    */
}


function getValues() {

    email = document.getElementById("email").value;
    nome = document.getElementById("nomecompleto").value;
    estadoSelecionado = selectEstado.options[selectEstado.selectedIndex].innerHTML;
    cidadeSelecionada = selectCidade.options[selectCidade.selectedIndex].innerHTML;
    var material = document.querySelectorAll('[name=material]:checked');
    var values = [];
    for (var i = 0; i < material.length; i++) {
        // utilize o valor aqui, adicionei ao array para exemplo
        values.push(material[i].getAttribute('id'));
    }
    var aux = "";
    values.forEach(value => {
        aux += `${value}, <br>`;
    });
    try {

        if (email != '' && nome != '' && estadoSelecionado != '' && cidadeSelecionada != '' && material.length != 0) {

            console.log(aux);
            localStorage.nome = nome;
            localStorage.email = email;
            localStorage.estadoSelecionado = estadoSelecionado;
            localStorage.cidadeSelecionada = cidadeSelecionada;
            localStorage.values = aux;
            console.log(email, nome, estadoSelecionado, cidadeSelecionada, material.length);
            window.open("teste.html");
            nome.value = ``;
            email.value = "";
            nome = document.getElementById("nomecompleto").value = '';
            email = document.getElementById("email").value = '';
            selectCidade.getElementsByTagName('option')[0].selected = 'selected'
            selectEstado.getElementsByTagName('option')[0].selected = 'selected'
            selectCidade.disabled = true;
            for (var i = 0; i < material.length; i++) {
                // utilize o valor aqui, adicionei ao array para exemplo
                material[i].checked = false;
            }

        } else {
            console.log("preencha os dados");
        }
    } catch (error) {
        console.log(error);
        console.log("preencha os dados");
    }



    //... depois ...

}
