let conjunto = new Conjunto();
conjunto.popular(Array.from(document.getElementsByClassName("peca")));

let promocao = document.getElementById("promocao");

Array.from(promocao.children).forEach(filho => {

    filho.onclick = function(){

        conjunto.promover(filho.innerHTML);
    };
});

function promover(){

    promocao.style.visibility = "visible";

    promocao.addEventListener("click", function(){

        promocao.style.visibility = "hidden";
    });
}

Array.from(document.getElementsByClassName("casa")).forEach(casa => {

    casa.onclick = function(){

        let ultima = conjunto.ultimaPecaClicada;

        let mov = new Movimento(new Posicao(casa.id), ultima.movimentoEPossivel(new Posicao(casa.id)));
        
        if(mov.natureza){

            ultima.executarMovimento(mov);

            if(mov.natureza != "EN_PASSANT_PASSIVO") conjunto.enPassant = null;

            Tabuleiro.apagarCasas();

            if(conjunto.verificarPromocao(1)) promover();

            conjunto.jogarPreta();
        }
        else{

            Tabuleiro.apagarCasas();
        }
    }
});