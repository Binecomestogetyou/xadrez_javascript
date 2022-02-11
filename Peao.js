class Peao extends Peca{

    constructor(elemento, conjunto){

        super(elemento, conjunto);

        this.primeiroMovimento = true;
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    executarMovimento(movimento){

        this.primeiroMovimento = false;
        this.mudarPosicao(movimento.destino);
  
        switch(movimento.natureza){

            case "CAPTURA":
                this._conjunto.destruir(movimento.destino, -this.cor);
                break;

            case "EN_PASSANT_PASSIVO":

                this._conjunto.definirEnPassant(this);
                break;
                    
            case "EN_PASSANT_ATIVO":
                    this._conjunto.destruirEnPassant();
        }
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    gerarMovimentos(){

        let movimentos = new Array();
        var pos = new Posicao(this.posicao.coluna, this.posicao.linha + this.cor);

        if( (1 < this.posicao.linha && this.posicao.linha < 8) && this._conjunto.estaVazia(pos)){
            
            movimentos.push(new Movimento(pos, "NEUTRO"));

            pos = new Posicao(this.posicao.coluna, this.posicao.linha + 2*this.cor);
            
            if( this.primeiroMovimento && this._conjunto.estaVazia(pos))
            {
                movimentos.push(new Movimento(pos, "EN_PASSANT_PASSIVO"));
            }
        }
    
        

        if(this.posicao.coluna > 1){
            
            pos = new Posicao(this.posicao.coluna - 1, this.posicao.linha + this.cor);

            if(this._conjunto.inimigaOcupa(-this.cor, pos)) movimentos.push(new Movimento(pos, "CAPTURA"));
            else if(this._conjunto.valeEnPassant(pos, -this.cor)) movimentos.push(new Movimento(pos, "EN_PASSANT_ATIVO"));
                
            
        }
            
        if(this.posicao.coluna < 8){
            
            pos = new Posicao(this.posicao.coluna + 1, this.posicao.linha + this.cor);
            
            if(this._conjunto.inimigaOcupa(-this.cor, pos)) movimentos.push(new Movimento(pos, "CAPTURA"));
            else if(this._conjunto.valeEnPassant(pos, -this.cor)) movimentos.push(new Movimento(pos, "EN_PASSANT_ATIVO"));
        }

        return movimentos
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    mover(){

	    this.movimentos = this.gerarMovimentos();
	
	    if(this.movimentos.length == 0) return null;
	    else{
	
	    	let mov = this.movimentos[Math.floor(Math.random()*this.movimentos.length)];
            
            this.executarMovimento(mov);
	
    	    return mov;
        }
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    promover(peca){

        let novaPeca;

        switch(peca){

            case 0:
                this._elemento.className = this._elemento.className.replace("peao", "torre");
                this._elemento.src = this._elemento.className.includes("preta") ? "./res/images/TP.png" : "./res/images/TB.png";
                
                return new Torre(this._elemento, this._conjunto);

            case 1:
                this._elemento.className = this._elemento.className.replace("peao", "cavalo");
                this._elemento.src = this._elemento.className.includes("preta") ? "./res/images/CP.png" : "./res/images/CB.png";
                    
                return new Cavalo(this._elemento, this._conjunto);
            
            case 2:
                this._elemento.className = this._elemento.className.replace("peao", "bispo");
                this._elemento.src = this._elemento.className.includes("preta") ? "./res/images/BP.png" : "./res/images/BB.png";
                    
                return new Bispo(this._elemento, this._conjunto);

            case 3:
                this._elemento.className = this._elemento.className.replace("peao", "dama");
                this._elemento.src = this._elemento.className.includes("preta") ? "./res/images/DP.png" : "./res/images/DB.png";
                    
                return new Dama(this._elemento, this._conjunto);
        }
    }
        


}