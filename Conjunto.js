class Conjunto {

    constructor(pecas){

        this.Brancas = new Array();
        this.Pretas = new Array();
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
                        
                }

                if(piece.cor == 1) this.Brancas.push(piece);
                else this.Pretas.push(piece);
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

    destruir(posicao, cor){

        let aux = cor == 1 ? Brancas : Pretas;
        
        let i = 0;
        
        aux.forEach(peca =>
            {
                if(peca.obterPosicao() == posicao){
                    aux.splice(aux.indexOf(peca), 1);
                return;
                }
            }
        );
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/


    estaVazia(casa){

        let estavazia = true;

        this.Brancas.forEach(peca => { if( peca.obterPosicao() == casa) estavazia = false;});
        //this.Pretas.forEach(peca => { if( peca.obterPosicao() == casa) estavazia = false;});
        
        return estavazia;
    }

    /*************************************************************************************************
    **************************************************************************************************
    *************************************************************************************************/

    inimigaOcupa(cor, posicao){

        let inimigaocupa = false;

        let aux = cor == -1 ? this.Pretas : this.Brancas;
        
        aux.forEach(peca => {if(peca.obterPosicao() == posicao) inimigaocupa = true;});
        
        return inimigaocupa;
    }

    /*************************************************************************************************
    **************************************************************************************************
    *************************************************************************************************/


    jogarBranca(){

        let a = Math.floor(Math.random()*this.Brancas.length);

        console.log("Vale " + a);

        while(this.Brancas[a].mover() == false){}
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

    valeEnPassant(posicao){

        if(enPassant === null) return false;
        else return posicao == enPassant.obterPosicao();
    }
}