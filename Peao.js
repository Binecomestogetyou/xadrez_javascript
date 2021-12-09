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

    

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    gerarMovimentos(){

        let movimentos = Array();
        var pos = new Posicao(this.posicao.coluna, this.posicao.linha + this.cor);

        if(this.conjunto.estaVazia(pos)){
            
            movimentos.push(pos);

            pos = new Posicao(this.posicao.coluna, this.posicao.linha + 2*this.cor);
            
            if( this.primeiroMovimento && this.conjunto.estaVazia(pos))
            {
                movimentos.push(pos);
            }
        }
    
        pos = new Posicao(this.posicao.coluna - 1, this.posicao.linha + this.cor);

        if(this.posicao.coluna > 1 && this.conjunto.inimigaOcupa(pos))
           /* || Conjunto.valeEnPassant(new Posicao(this.posicao.coluna - 1, this.posicao.linha + 1)) )*/{
                
            movimentos.push(pos);
        }

        pos = new Posicao(this.posicao.coluna + 1, this.posicao.linha + this.cor);
            
        if(this.posicao.coluna < 8 && this.conjunto.inimigaOcupa(pos)){
            // || Conjunto.valeEnPassant(Posicao(this.posicao.coluna + 1, this.posicao.linha + 1)) )*/){
                
            movimentos.push(pos);
        }

        return movimentos
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    mover(){

        this.super.mover();

	    let movimentos = this.gerarMovimentos();
	
	    if(movimentos.size() == 0) return false;
	    else{
	
	    	let origem = this.posicao;
	    	let destino = movimentos[Math.floor(Math.random(movimentos.size()))];
		
		

    		if(origem.coluna != destino.coluna) Conjunto.capturar(destino, this.cor);
		
    		if(Math.abs(origem.linha - destino.linha) == 2) Conjunto.definirEnPassant(this);
			
    		if(destino.linha == 8 || destino.linha == 1){
			
    			Conjunto.promover(this, destino);
    		}
    		else{
			
	    		this.mudarPosicao(destino);
	    	}
    	}
	
    	return true;
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

     mudarPosicao(destino){
        
        this.posicao = destino;
    }
        


}