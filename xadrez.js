var conjunto = new Conjunto(Array.from(document.getElementsByClassName("peca")));
var tabuleiro = new Tabuleiro(Array.from(document.getElementsByClassName("casa")));

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

            conjunto.jogarPreta();
        }
        else{

            tabuleiro.apagarCasas();
        }

        console.log(conjunto.enPassant);
    }
})