var Tabuleiro = {

    casasAcesas: undefined
};


Tabuleiro.acender = function(casas){

    if(this.casasAcesas !== undefined) this.apagarCasas();

    this.acenderCasas(casas); 
}


Tabuleiro.apagarCasas = function(){

    this.casasAcesas.forEach(item =>
        {
                
            let casa = document.getElementById(item.emString);

            if(casa.classList.contains("clara")){
                casa.style.backgroundColor = "#6495ed";
            }
            else{
                casa.style.backgroundColor = "#000080";
            }
        });

    this.casasAcesas = undefined;
}



Tabuleiro.acenderCasas = function(casasParaAcender){

    this.casasAcesas = casasParaAcender;

    this.casasAcesas.forEach(item =>
            
        {
            let casa = document.getElementById(item.emString);

            if(casa.classList.contains("clara")){
                casa.style.backgroundColor = "#ba55d3";
            }
            else{
                casa.style.backgroundColor = "#4b0082";
            }
        }
        );
}

Tabuleiro.obterCasas = function(){

    return this._casas;
}
