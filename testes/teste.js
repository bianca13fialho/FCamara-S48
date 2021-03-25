window.onload = function(){

    var nome =localStorage.nome;
    var email = localStorage.email;
    var estadoSelecionado = localStorage.estadoSelecionado;
    var values = localStorage.values;

    var card = document.getElementById("cardLista");
    var cardContent = document.getElementById("cardContent");

    cardContent.innerHTML += `<h2> Lista de materiais </h2> <br>`;

    card.innerHTML += `Nome: ${nome}, Email: ${email}, Estado: ${estadoSelecionado} `;
    cardContent.innerHTML += `${values}`;
};
