class Conjunto {

    constructor(pecas){

        this.Brancas = new Array();
        this.Pretas = new Array();
        this.enPassant = null;
        let este = this;

        pecas.forEach(peca => {

            let classes = peca.className;

            let piece;

                switch(classes.split(" ")[2]){

                    case "peao":
                        piece = new Peao(peca, este);
                        break;
/*
                    case "torre":
                        piece = new Torre(peca, este);
                        break;

                    case "cavalo":
                        piece = new Cavalo(peca, este);
                        break;

                    case "bispo":
                        piece = new Bispo(peca, este);
                        break;

                    case "dama":
                        piece = new Dama(peca, este);
                        break;

                    case "rei":
                        piece = new Rei(peca, este);
                        */
                }

                if(piece !== undefined){
                if(piece.cor == 1) this.Brancas.push(piece);
                else this.Pretas.push(piece);}
            }
        );

        
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    capturar(posicao, cor){
	
        let aux = this.cor == -1 ? Pretas : Brancas;

        
        aux.forEach(peca =>
            {if(peca.obterPosicao() == posicao) destruir(posicao, a.obterCor());}
        );
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    definirEnPassant(peao){ enPassant = peao; }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    set definirUltimaPecaClicada(peca){

        this.ultimaPecaClicada = peca;
    }

    destruir(posicao, cor){

        let aux = cor == 1 ? this.Brancas : this.Pretas;
        
        for(let i = 0; i < aux.length; i++){
                
            if(aux[i].obterPosicao().igual(posicao)){

                let eleAux = aux[i].elemento;

                eleAux.parentNode.removeChild(eleAux);

                aux.splice(i, 1);

                
                break;
            }
        }
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/


    estaVazia(casa){

        let estavazia = true;

        this.Brancas.forEach(peca => { if( peca.obterPosicao().igual(casa)) estavazia = false;});
        this.Pretas.forEach(peca => { if( peca.obterPosicao().igual(casa)) estavazia = false;});
        
        return estavazia;
    }

    executarMovimento(ultima, mov){

        ultima.posicao = mov.posicao;

        if(mov.natureza === "EN_PASSANT"){

            this.definirEnPassant = ultima;
        }
        else if(mov.natureza === "CAPTURA"){

            this.destruir(mov.posicao);
        }

        if(ultima.classe === "Peao" || ultima.classe === "Torre") ultima.primeiroMovimento = false;
    }

    /*************************************************************************************************
    **************************************************************************************************
    *************************************************************************************************/

    inimigaOcupa(cor, posicao){

        let inimigaocupa = false;

        let aux = cor == -1 ? this.Pretas : this.Brancas;
        
        aux.forEach(peca => {if(peca.obterPosicao().igual(posicao)) inimigaocupa = true;});
        
        return inimigaocupa;
    }

    /*************************************************************************************************
    **************************************************************************************************
    *************************************************************************************************/


    jogarPreta(){

        let aux = [...this.Pretas];



        while(aux.length > 0){
            
            let a = Math.floor(Math.random()*aux.length);

            let mov = aux[a].mover();

            if(mov === null) aux.splice(a, 1);
            else{
                
                aux[a].executarMovimento(mov)
                return;
            }
        }
    }

    /*************************************************************************************************
    **************************************************************************************************
    *************************************************************************************************/

    mostrarTodasAsPecas(){

        for(const peca of this.Pretas) console.log(peca.className);
        for(const peca of this.Brancas) console.log(peca.className);
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    obterEnPassant(){ return enPassant; }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    promover(peao, promovido){

        let aux = peao.obterCor() == 1 ? Brancas : Pretas;
        
        destruir(peao.obterPosicao(), peao.obterCor());
        
        switch(Math.floor(Math.random()*4)){
        
            case 0:
                aux.push(new Torre(promovido, peao.obterCor()));
                break;
                
            case 1:
                aux.push(new Cavalo(promovido, peao.obterCor()));
                break;
                
            case 2:
                aux.push(new Bispo(promovido, peao.obterCor()));
                break;
                
            case 3:
                aux.push(new Dama(promovido, peao.obterCor()));
        }
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    valeEnPassant(posicao, cor){

        if(this.enPassant === null) return false;
        else{

            let aux = new Posicao( posicao.coluna, posicao.linha + cor);
		
		    if(this.enPassant.obterPosicao().igual(aux) && this.enPassant.obterCor() == cor) return true;
		    else return false;
        }
    }
}