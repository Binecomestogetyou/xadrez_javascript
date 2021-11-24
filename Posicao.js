class Posicao{

    constructor(parametro1, parametro2){

        if(parametro2 === undefined){

            this.coluna = parametro1.charCodeAt(0) - 64;
            this.linha = parametro1.charCodeAt(1) - 48;
        }
        else{

            this.coluna = parametro1;
            this.linha = parametro2;
        }
    }

    

    /*posicaoPorCoordenadas(coluna, linha){

        return new Posicao(String.fromCharCode(coluna), String.fromCharCode(linha + 64));
    }*/

    emString(){

        return String.fromCharCode(this.coluna + 64) + String.fromCharCode(this.linha + 48);
    }
}