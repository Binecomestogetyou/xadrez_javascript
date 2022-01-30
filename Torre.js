class Torre extends Peca{

    constructor(elemento){

        super(elemento);
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