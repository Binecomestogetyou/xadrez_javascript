let conjunto = new Conjunto(Array.from(document.getElementsByClassName("peca")));
let tabuleiro = new Tabuleiro(Array.from(document.getElementsByClassName("casa")));
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

conjunto.Brancas.forEach(peca =>
    
        {
            
            peca.elemento.addEventListener("click", function(event){

                event.stopPropagation();

                tabuleiro.acender(peca.posicoesPossiveis);

                conjunto.definirUltimaPecaClicada = peca;
            });
        }
    );

tabuleiro.obterCasas.forEach(casa => {

    casa.onclick = function(){

        let ultima = conjunto.ultimaPecaClicada;

        let mov = new Movimento(new Posicao(casa.id), ultima.movimentoEPossivel(new Posicao(casa.id)));
        
        if(mov.natureza){

            ultima.executarMovimento(mov);

            if(mov.natureza != "EN_PASSANT_PASSIVO") conjunto.enPassant = null;

            tabuleiro.apagarCasas();

            if(conjunto.verificarPromocao(1)) promover();

            conjunto.jogarPreta();
        }
        else{

            tabuleiro.apagarCasas();
        }
    }
})