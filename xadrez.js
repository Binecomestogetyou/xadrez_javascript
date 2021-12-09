var conjunto = new Conjunto(Array.from(document.getElementsByClassName("peca")));

conjunto.Brancas.forEach(peca =>
    
        {
            
            peca.elemento.onclick = function(){

                Tabuleiro.acender(peca);
            }
        }
    );
