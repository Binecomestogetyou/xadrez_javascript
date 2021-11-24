class Peao extends Peca{

    constructor(elemento){

        super(elemento);

        if(this.cor == 1){

            this.onclick = function(){ 
                console.log("Cliquie");
                Tabuleiro.acender(this.gerarMovimentos());
            };
        }
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    gerarMovimentos(){

        let movimentos = Array();

       // if(Conjunto.estaVazia( new Posicao(this.posicao.coluna, this.posicao.linha + this.cor))){
            
            movimentos.push(new Posicao(this.posicao.coluna, this.posicao.linha + 1));
            
            if( (this.cor == 1 && this.posicao.linha == 2) || (this.cor == -1 && this.posicao.linha == 7)
                && Conjunto.estaVazia(Posicao(this.posicao.coluna, this.posicao.linha + 2*this.cor)))
            {
                movimentos.push(new Posicao(this.posicao.coluna, this.posicao.linha + 2*this.cor));
            }
       // }
    
        
        if(this.posicao.coluna > 1
           // && ( Conjunto.inimigaOcupa(this.cor, Posicao(this.posicao.coluna - 1, this.posicao.linha + 1))
           /* || Conjunto.valeEnPassant(new Posicao(this.posicao.coluna - 1, this.posicao.linha + 1)) )*/){
                
            movimentos.push(new Posicao(this.posicao.coluna - 1, this.posicao.linha + 1));
        }
            
        if(this.posicao.coluna < 8
           /* && ( Conjunto.inimigaOcupa(this.cor, Posicao(this.posicao.coluna + 1, this.posicao.linha + 1))
             || Conjunto.valeEnPassant(Posicao(this.posicao.coluna + 1, this.posicao.linha + 1)) )*/){
                
            movimentos.push(new Posicao(this.posicao.coluna + 1, this.posicao.linha + 1));
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