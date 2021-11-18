class Peca {

    constructor(elemento){

        this.elemento = elemento;
        this.posicao = new Posicao(elemento.parentNode.id);
        this.cor = elemento.className.includes("branca") ? 1 : -1;
    }

    

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    mover(){
	
        if( (Conjunto.obterEnPassant() === null)
            && (this.obterCor() == Conjunto.obterEnPassant().cor) ) Conjunto.limparEnPassant();
    }
}