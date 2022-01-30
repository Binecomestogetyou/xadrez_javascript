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

                    case "torre":
                        piece = new Torre(peca, este);
                        break;
/*
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

    definirEnPassant(peao){ this.enPassant = peao; }

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

    destruirEnPassant(){

        this.destruir(this.enPassant.obterPosicao(), this.enPassant.cor);
	
	    this.enPassant = null;
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
                
                if(mov.natureza != "EN_PASSANT_PASSIVO") this.enPassant = null;
                break;
            }
        }

        if(this.verificarPromocao()) this.promover();
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

    obterEnPassant(){ return this.enPassant; }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    promover(classe){
        let aux = [...this.Pretas, ...this.Brancas];
        let promovendo;

        for(let i = 0; i < aux.length; i++){

            if(aux[i].constructor.name === "Peao" && (aux[i].posicao.linha == 1 || aux[i].posicao.linha == 8)){
                promovendo = aux[i];
            }
        }

        aux = promovendo.cor == -1 ? this.Pretas : this.Brancas;

        let determinante;

        switch(classe){

            case "Torre":
                determinante = 0;
                break;

            case "Cavalo":
                determinante = 1;
                break;

            case "Bispo":
                determinante = 2;
                break;

            case "Dama":
                determinante = 3;
                break;

            default:
                determinante = Math.floor(Math.random()*4);
                break;
        }
        
        aux.push(promovendo.promover(determinante));

        aux.splice(aux.indexOf(promovendo), 1);
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    valeEnPassant(posicao, cor){

        let posicaoCorrigida = new Posicao(posicao.coluna, posicao.linha + cor);

        if(this.enPassant === null) return false;
        else{
		
		    return this.enPassant.obterPosicao().igual(posicaoCorrigida)
                    && this.enPassant.cor == cor ? true : false;
        }
    }

    /*************************************************************************************************
    **************************************************************************************************
    *************************************************************************************************/

    verificarPromocao(cor){

        let aux = cor == 1 ? [...this.Brancas] : [...this.Pretas];

        for(let i = 0; i < aux.length; i++){

            if(aux[i].constructor.name === "Peao" && (aux[i].posicao.linha == 1 || aux[i].posicao.linha == 8)){

                return true;
            }
        }

        return false;
    }
}