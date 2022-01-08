class Peca {

    constructor(elemento, conjunto){

        this.elemento = elemento;
        this.conjunto = conjunto;
        this.posicao = new Posicao(elemento.parentNode.id);
        this._cor = elemento.className.includes("branca") ? 1 : -1;
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

    movimentoEPossivel(posicao){

       let movimentos = this.movimentosPossiveis;
       
       for(let i = 0; i < movimentos.length; i++){

            if(movimentos[i].destino.igual(posicao)) return movimentos[i].natureza;
       }

        return "";
    }

    mudarPosicao(destino){

        console.log(this.elemento);
    }

    get cor(){

        return this._cor;
    }

    get movimentosPossiveis(){

        return this.gerarMovimentos();
    }

    get obterPosicoes(){

        let posicoes = new Array();

        this.obterMovimentos.forEach(mov => {

            posicoes.push(mov.obterDestino);
        })

        return posicoes;
    }

    obterPosicao(){

        return this.posicao;
    }

    get posicoesPossiveis(){

        let posicoes = new Array;

        let movimentos = this.movimentosPossiveis;

        movimentos.forEach(mov => { posicoes.push(mov.destino)});

        return posicoes;
    }
}