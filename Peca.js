class Peca {

    constructor(elemento, conjunto){

        this.elemento = elemento;
        this.conjunto = conjunto;
        this.posicao = new Posicao(elemento.parentNode.id);
        this.cor = elemento.className.includes("branca") ? 1 : -1;
    }

    static criar(peca){

        let classes = peca.className;

        switch(classes.split(" ")[2]){

            case "peao":
                return new Peao(peca);

            case "torre":
                return new Torre(peca);

            case "cavalo":
                return new Cavalo(peca);

            case "bispo":
                return new Bispo(peca);

            case "dama":
                return new Dama(peca);

            case "rei":
                return new Rei(peca);
       
        }
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    mover(){
	
        if( (Conjunto.obterEnPassant() === null)
            && (this.obterCor() == Conjunto.obterEnPassant().cor) ) Conjunto.limparEnPassant();
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    obterPosicao(){

        return this.posicao;
    }
}