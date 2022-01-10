class Peao extends Peca{

    constructor(elemento, conjunto){

        super(elemento, conjunto);

        if(this.cor == 1){

            this.onclick = function(){ 
                
                Tabuleiro.acender(this.gerarMovimentos());
            };
        }

        this.primeiroMovimento = true;
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    executarMovimento(movimento){

        this.primeiroMovimento = false;
        this.mudarPosicao(movimento.destino);
        this.conjunto.limparEnPassant = false;
  
        switch(movimento.natureza){

            case "CAPTURA":
                this.conjunto.destruir(movimento.destino, -this.cor);
                break;

            case "EN_PASSANT_PASSIVO":

                this.conjunto.definirEnPassant(this);
                this.conjunto.limparEnPassant = false;
                break;
                    
            case "EN_PASSANT_ATIVO":
                    this.conjunto.destruirEnPassant();
        }
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    gerarMovimentos(){

        let movimentos = new Array();
        var pos = new Posicao(this.posicao.coluna, this.posicao.linha + this.cor);

        if( (1 < this.posicao.linha && this.posicao.linha < 8) && this.conjunto.estaVazia(pos)){
            
            movimentos.push(new Movimento(pos, "NEUTRO"));

            pos = new Posicao(this.posicao.coluna, this.posicao.linha + 2*this.cor);
            
            if( this.primeiroMovimento && this.conjunto.estaVazia(pos))
            {
                movimentos.push(new Movimento(pos, "EN_PASSANT_PASSIVO"));
            }
        }
    
        

        if(this.posicao.coluna > 1){
            
            pos = new Posicao(this.posicao.coluna - 1, this.posicao.linha + this.cor);

            if(this.conjunto.inimigaOcupa(-this.cor, pos)) movimentos.push(new Movimento(pos, "CAPTURA"));
            else if(this.conjunto.valeEnPassant(pos, -this.cor)) movimentos.push(new Movimento(pos, "EN_PASSANT_ATIVO"));
                
            
        }
            
        if(this.posicao.coluna < 8){
            
            pos = new Posicao(this.posicao.coluna + 1, this.posicao.linha + this.cor);
            
            if(this.conjunto.inimigaOcupa(-this.cor, pos)) movimentos.push(new Movimento(pos, "CAPTURA"));
            else if(this.conjunto.valeEnPassant(pos, -this.cor)) movimentos.push(new Movimento(pos, "EN_PASSANT_ATIVO"));
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

     mudarPosicao(destino){
        
        this.posicao = destino;

        document.getElementById(destino.emString).appendChild(this.elemento);
    }
        


}