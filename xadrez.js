var conjunto = Array.from(document.getElementsByClassName("peca", "branca"));

conjunto.forEach(peca =>
    
        {
            peca.onclick = function(){

                Tabuleiro.acender(peca);
            }
        }
    );
