class Tabuleiro{

    static casasAcesas;

    static acender(peca){

        

        if(this.casasAcesas !== undefined) Tabuleiro.apagarCasas();

        this.casasAcesas = peca.gerarMovimentos();

        this.acenderCasas();

        
    }

    static apagarCasas(){

        this.casasAcesas.forEach(item =>
            {
                let casa = document.getElementById(item.emString());

                if(casa.classList.contains("casaclara")){
                    casa.style.backgroundColor = "#6495ed";
                }
                else{
                    casa.style.backgroundColor = "#000080";
                }
            })
    }

    static acenderCasas(){

        this.casasAcesas.forEach(item =>
            
            {
                let casa = document.getElementById(item.emString());

                if(casa.classList.contains("casaclara")){
                    casa.style.backgroundColor = "#ba55d3";
                }
                else{
                    casa.style.backgroundColor = "#4b0082";
                }
            }
            );
    }
}