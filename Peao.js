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

        console.log("Executar movimento");

        this.primeiroMovimento = false;
        this.mudarPosicao(movimento.destino);
  
        switch(movimento.natureza){

            case "CAPTURA":
                this.conjunto.destruir(movimento.destino, -this.cor);
                break;

            case "EN_PASSANT_PASSIVA":
                this.conjunto.definirEnPassant(this);
                this.conjunto.definirStatusEnPassant(false);
                break;
                    
            case "EN_PASSANT_ATIVA":
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
                movimentos.push(new Movimento(pos, "EN_PASSANT"));
            }
        }
    
        pos = new Posicao(this.posicao.coluna - 1, this.posicao.linha + this.cor);

        if(this.posicao.coluna > 1 && this.conjunto.inimigaOcupa(-this.cor, pos))
           /* || Conjunto.valeEnPassant(new Posicao(this.posicao.coluna - 1, this.posicao.linha + 1)) )*/{
                
            movimentos.push(new Movimento(pos, "CAPTURA"));
        }

        pos = new Posicao(this.posicao.coluna + 1, this.posicao.linha + this.cor);
            
        if(this.posicao.coluna < 8 && this.conjunto.inimigaOcupa(-this.cor, pos)){
            // || Conjunto.valeEnPassant(Posicao(this.posicao.coluna + 1, this.posicao.linha + 1)) )*/){
                
            movimentos.push(new Movimento(pos, "CAPTURA"));
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
	
	    	let mov = this.movimentos[Math.floor(Math.random(this.movimentos.length))];
            this.mudarPosicao(mov.destino);

            let casa = document.getElementById(mov.destino.emString());

            casa.appendChild(this.elemento);
		
            this.conjunto.statusEnPassant = true;
	
    	    return mov;
        }
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

     mudarPosicao(destino){
        
        this.posicao = destino;
    }
        


}