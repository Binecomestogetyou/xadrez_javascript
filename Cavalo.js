class Cavalo extends Peca{

    constructor(elemento, conjunto){

        super(elemento, conjunto);
    }

    executarMovimento(movimento){

        this.mudarPosicao(movimento.destino);
  
        if(movimento.natureza === "CAPTURA"){

            this._conjunto.destruir(movimento.destino, -this.cor);
        }
    }

    gerarMovimentos(){

        let movimentos = new Array();
        let pos;

        if(this.posicao.linha < 7){
	
            if(this.posicao.coluna > 1){
            
                pos = new Posicao(this.posicao.coluna - 1, this.posicao.linha + 2);
                
                if(this._conjunto.estaVazia(pos)) movimentos.push(new Movimento(pos, "NEUTRO"));
                else if(this._conjunto.inimigaOcupa( -this.cor, pos)) movimentos.push(new Movimento(pos, "CAPTURA"));
            }
            
            if(this.posicao.coluna < 8){
            
                pos = new Posicao(this.posicao.coluna + 1, this.posicao.linha + 2);
                
                if(this._conjunto.estaVazia(pos)) movimentos.push(new Movimento(pos, "NEUTRO"));
                else if(this._conjunto.inimigaOcupa( -this.cor, pos)) movimentos.push(new Movimento(pos, "CAPTURA"));
            }
        }
        
        // Movimentos na direção decrescente das linhas
        if(this.posicao.linha > 2){
        
            if(this.posicao.coluna > 1){
            
                pos = new Posicao(this.posicao.coluna - 1, this.posicao.linha - 2);
                
                if(this._conjunto.estaVazia(pos)) movimentos.push(new Movimento(pos, "NEUTRO"));
                else if(this._conjunto.inimigaOcupa( -this.cor, pos)) movimentos.push(new Movimento(pos, "CAPTURA"));
            }
            
            if(this.posicao.coluna < 8){
            
                pos = new Posicao(this.posicao.coluna + 1, this.posicao.linha - 2);
                
                if(this._conjunto.estaVazia(pos)) movimentos.push(new Movimento(pos, "NEUTRO"));
                else if(this._conjunto.inimigaOcupa( -this.cor, pos)) movimentos.push(new Movimento(pos, "CAPTURA"));
            }
        }
        
        // Movimentos na direção crescente das colunas
        if(this.posicao.coluna < 7){
        
            if(this.posicao.linha > 1){
            
                pos = new Posicao(this.posicao.coluna + 2, this.posicao.linha - 1);
                
                if(this._conjunto.estaVazia(pos)) movimentos.push(new Movimento(pos, "NEUTRO"));
                else if(this._conjunto.inimigaOcupa( -this.cor, pos)) movimentos.push(new Movimento(pos, "CAPTURA"));
            }
            
            if(this.posicao.linha < 8){
            
                pos = new Posicao(this.posicao.coluna + 2, this.posicao.linha + 1);
                
                if(this._conjunto.estaVazia(pos)) movimentos.push(new Movimento(pos, "NEUTRO"));
                else if(this._conjunto.inimigaOcupa( -this.cor, pos)) movimentos.push(new Movimento(pos, "CAPTURA"));
            }
        }
        
        // Movimentos na direção decrescente das colunas
        if(this.posicao.coluna > 2){
        
            if(this.posicao.linha > 1){
            
                pos = new Posicao(this.posicao.coluna - 2, this.posicao.linha - 1);
                
                if(this._conjunto.estaVazia(pos)) movimentos.push(new Movimento(pos, "NEUTRO"));
                else if(this._conjunto.inimigaOcupa( -this.cor, pos)) movimentos.push(new Movimento(pos, "CAPTURA"));
            }
            
            if(this.posicao.linha < 8){
            
                pos = new Posicao(this.posicao.coluna - 2, this.posicao.linha + 1);
                
                if(this._conjunto.estaVazia(pos)) movimentos.push(new Movimento(pos, "NEUTRO"));
                else if(this._conjunto.inimigaOcupa( -this.cor, pos)) movimentos.push(new Movimento(pos, "CAPTURA"));
            }
        }

        return movimentos;
    }

    mover(){

        this.movimentos = this.gerarMovimentos();
	
	    if(this.movimentos.length == 0) return null;
	    else{
	
	    	let mov = this.movimentos[Math.floor(Math.random()*this.movimentos.length)];
            
            this.executarMovimento(mov);
	
    	    return mov;
        }
    }
}