class Torre extends Peca{

    constructor(elemento, conjunto){

        super(elemento, conjunto);
    }

    gerarMovimentos(){

        return this.gerarMovimentosCardeais(false);
    }

    mover(){

        this.movimentos = this.gerarMovimentos();
	
	    if(this.movimentos.length == 0) return null;
	    else{

            console.log(this);
            console.log(this.movimentos);
	
	    	let mov = this.movimentos[Math.floor(Math.random()*this.movimentos.length)];
            
            this.executarMovimento(mov);
	
    	    return mov;
        }
    }
}