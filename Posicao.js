class Posicao{

    Posicao(parametro1, parametro2){

        if(parametro2 === undefined){

            coluna = parametro1.charCodeAt(0) - 64;
            linha = parametro1.charCodeAt(1) - 64;
        }
        else{

            coluna = parametro1;
            linha = parametro2;
        }
    }

    

    posicaoPorCoordenadas(coluna, linha){

        return new Posicao(String.fromCharCode(coluna + 64), String.fromCharCode(linha + 64));
    }

    emString(){

        return String.fromCharCode(coluna + 64) + String.fromCharCode(linha + 64);
    }
}