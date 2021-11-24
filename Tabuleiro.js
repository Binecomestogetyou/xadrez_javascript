class Tabuleiro{

    static casasAcesas;

    static acender(peca){

        let alvo = Peca.criar(peca);

        if(this.casasAcesas !== undefined) Tabuleiro.apagarCasas();

        this.casasAcesas = alvo.gerarMovimentos();

        this.acenderCasas();

        
    }

    static apagarCasas(){

        this.casasAcesas.forEach(item =>
            {
                let casa = document.getElementById(item.emString());
                casa.style.border = "none";
            })
    }

    static acenderCasas(){

        this.casasAcesas.forEach(item =>
            
            {
                let casa = document.getElementById(item.emString());
                casa.style.border = "#f00 solid 1px";
            }
            );
    }
}