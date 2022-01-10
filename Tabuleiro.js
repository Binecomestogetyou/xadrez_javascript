class Tabuleiro{

    constructor(casas){

        this._casas = casas
    }

    acender(casas){

        

        if(this.casasAcesas !== undefined) this.apagarCasas();

        this.acenderCasas(casas);

        
    }

    apagarCasas(){

        this.casasAcesas.forEach(item =>
            {
                
                let casa = document.getElementById(item.emString);

                if(casa.classList.contains("clara")){
                    casa.style.backgroundColor = "#6495ed";
                }
                else{
                    casa.style.backgroundColor = "#000080";
                }
            })
    }

    acenderCasas(casasParaAcender){

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

    get obterCasas(){

        return this._casas;
    }
}