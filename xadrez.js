var conjunto = new Conjunto(Array.from(document.getElementsByClassName("peca")));
var tabuleiro = new Tabuleiro(Array.from(document.getElementsByClassName("casa")));

conjunto.Brancas.forEach(peca =>
    
        {
            
            peca.elemento.addEventListener("click", function(event){

                event.stopPropagation();

                let movimentosPossiveis = new Array();

                peca.obterMovimentos.forEach(movimento => {

                    movimentosPossiveis.push(movimento.destino);
                })

                tabuleiro.acender(movimentosPossiveis);
                conjunto.definirUltimaPecaClicada = peca;
            
            });
        }
    );

tabuleiro.obterCasas.forEach(casa => {

    casa.onclick = function(){

        let ultima = conjunto.ultimaPecaClicada
        
        let mov = ultima.movimentoEPossivel(new Posicao(casa.id));

        if(mov === null) tabuleiro.apagarCasas();
        else {

            casa.appendChild(ultima.elemento);

            tabuleiro.apagarCasas();

            ultima.executarMovimento(mov);

            conjunto.jogarPreta();
        }
    }
})