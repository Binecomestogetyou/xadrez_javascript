class Peca {

    elemento;
    conjunto;

    constructor(elemento, conjunto){

        this.elemento = elemento;
        this.conjunto = conjunto;
        this.posicao = new Posicao(elemento.parentNode.id);
        this._cor = elemento.className.includes("branca") ? 1 : -1;
    }

    /********************************************************************
     ********************************************************************
     *******************************************************************/

    gerarMovimentosCardeais(reiChamou){

        let aux;
        let movimentos = new Array();

	    // Gerar movimentos no sentido decrescente das linhas
	    if(this.posicao.linha > 1){
	
		    for(let i = this.posicao.linha - 1; i > 0; i--) {
		
		    	aux = new Posicao(this.posicao.coluna, i);
			
		    	if(this.conjunto.estaVazia(aux)){
			
		    		let mov = new Movimento(aux, "NEUTRO");
				
		    		movimentos.push(mov);
		    	}
		    	else{
			    	if(this.conjunto.inimigaOcupa(this.cor, aux)){
				
			    		let mov = new Movimento(aux, "CAPTURA");
				
			    		movimentos.push(mov);
			    	}
				
			    	break;
			    }
			
			    if(reiChamou){
			
			    	break;
			    }
			
		    }
		
	    }
	
	    // Gerar movimentos no sentido crescente das linhas
	    if(this.posicao.linha < 8 ){
	
		    for(let i = this.posicao.linha + 1; i < 9; i++){
		
			    aux = new Posicao(this.posicao.coluna, i);
			
			    if(this.conjunto.estaVazia(aux)){
			
			    	let mov = new Movimento(aux, "NEUTRO");
				
			    	movimentos.push(mov);
			    }
			    else{
			    	if(this.conjunto.inimigaOcupa(this.cor, aux)){
				
			    		let mov = new Movimento(aux, "CAPTURA");
				
			    		movimentos.push(mov);
			    	}
				
			    	break;
			    }
			
			    if(reiChamou){
			
			    	break;
			    }
			
		    }
		
	    }
	
	    // Gerar movimentos no sentido decrescente das colunas
	    if(this.posicao.coluna > 1){
	
		    for(let i = this.posicao.coluna - 1; i > 0; i--){

		    	aux = new Posicao(i, this.posicao.linha);
			
		    	if(this.conjunto.estaVazia(aux)){
			
		    		let mov = new Movimento(aux, "NEUTRO");
				
		    		movimentos.push(mov);
		    	}
		    	else{
		    		if(this.conjunto.inimigaOcupa(this.cor, aux)){
				
			    		let mov = new Movimento(aux, "CAPTURA");
				
			    		movimentos.push(mov);
			    	}
				
			    	break;
			    }
			
			    if(reiChamou){
			
			    	break;
			    }
			
		    }
		
	    }
	
	    // Gerar movimentos no sentido crescente das colunas
	    if(this.posicao.coluna < 8){
	
	    	for(let i = this.posicao.coluna + 1; i < 9; i++){
		
	    		aux = new Posicao(i, this.posicao.linha);
			
	    		if(this.conjunto.estaVazia(aux)){
			
			    	let mov = new Movimento(aux, "NEUTRO");
				
			    	movimentos.push(mov);
			    }
			    else{
			    	if(this.conjunto.inimigaOcupa(this.cor, aux)){
				
			    		let mov = new Movimento(aux, "CAPTURA");
			    		movimentos.push(mov);
			    	}
				
			    	break;
			    }
			
			    if(reiChamou){
			
			    	break;
			    }
			
		    }
		
	    }

        return movimentos;
    }

    /*************************************************************************************************
     *************************************************************************************************
     ************************************************************************************************/

    movimentoEPossivel(posicao){

       let movimentos = this.movimentosPossiveis;
       
       for(let i = 0; i < movimentos.length; i++){

            if(movimentos[i].destino.igual(posicao)) return movimentos[i].natureza;
       }

        return "";
    }

    mudarPosicao(destino){

        console.log(this.elemento);
    }

    get cor(){

        return this._cor;
    }

    get movimentosPossiveis(){

        return this.gerarMovimentos();
    }

    get obterPosicoes(){

        let posicoes = new Array();

        this.obterMovimentos.forEach(mov => {

            posicoes.push(mov.obterDestino);
        })

        return posicoes;
    }

    obterPosicao(){

        return this.posicao;
    }

    get posicoesPossiveis(){

        let posicoes = new Array;

        let movimentos = this.movimentosPossiveis;

        movimentos.forEach(mov => { posicoes.push(mov.destino)});

        return posicoes;
    }
}