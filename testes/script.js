window.onload = function(){
var materiais = document.getElementById("materiais");

var valorEstados = ['Rio de Janeiro', 'São Paulo'];

selectEstado = document.getElementById("estado");
var valorMateriais = ['Lápis de Cor - 12 Cores', 'Lápis de Cor - 24 Cores', 'Caneta Esferográfica Azul ou Preta', 
'Caneta Esferográfica Azul ou Preta', 'Caneta Esferográfica Vermelha', 'Lápis Preto', 'Cola Líquida', 
'Tesoura sem Ponta', 'Cola Bastão', 'Borracha', 'Apontador', 'Régua', 'Caderno Universtário', 'Caderno de 20 materias',
'Mochila Escolar', 'Alcool em Gel', 'Agenda'];

    for(var i = 0; i < valorMateriais.length; i++){
        materiais.innerHTML += `<input type="checkbox" id="${valorMateriais[i]}" name="material">
        <label for="${valorMateriais[i]}"> ${valorMateriais[i]} </label> <br>`
    }

    for(var i = 0; i< valorEstados.length; i++){
        selectEstado.innerHTML += `<option name="estado">${valorEstados[i]}</option>`;


    }
}

function getValues() {

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

    nome = document.getElementById("nomecompleto").value;
    email = document.getElementById("email").value;
    estadoSelecionado = selectEstado.options[selectEstado.selectedIndex].innerHTML;
    localStorage.nome =  nome;
    localStorage.email = email;
    localStorage.estadoSelecionado = estadoSelecionado;
    localStorage.values = aux;

    window.open("teste.html");

  //... depois ...

  }







