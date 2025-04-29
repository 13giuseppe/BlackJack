var carta_coperta;
var totaleBancone=0;
var totaleTu=0;
var carteUscite = [];
var AssiTu = 0;
var AssiBanco = 0;
var draw = new Audio('carta.mp3');
var win = new Audio('win.mp3')
var i = 0;
var budget = 1000;
document.getElementById("Budget").innerHTML=budget + "€";

draw.volume = 1;


    function BancoCartaCoperta(){

    draw.play();
    
    // Bancone 
    let carta = Math.floor(Math.random() * 52) + 1;

    document.getElementById("Banco").innerHTML += '<img src="cards/back.png"id="carta" class="animazione" name="coperta"></img>';
    
        carteUscite[0] = carta;
    
        //Se esce un jack,regina o re
        
        if (carta%13 == 11){
            totaleBancone +=10
            carta_coperta = 10
        }
        else if (carta%13 == 12){
            totaleBancone +=10
            carta_coperta = 10
        }
        else if (carta%13 == 0){
            totaleBancone +=10
            carta_coperta = 10
        }
        else if (carta%13 == 1){
            totaleBancone +=11
            carta_coperta = 11
        }
        else {
            totaleBancone+=carta%13
            carta_coperta = carta%13;
        }
        
        carta_coperta = carta

        console.log(totaleBancone);

    }
    
    function BancoCartaScoperta(){
        
        draw.play();

        // Bancone - Carta scoperta
        
        carta = Math.floor(Math.random() * 52) + 1;
        
        while (carteUscite.includes(carta)){
            carta = Math.floor(Math.random() * 52) + 1;
        }
    
        carteUscite.push(carta);
        
        document.getElementById("Banco").innerHTML += '<img src="cards/'+ carta +'.png" id="carta" class="animazione"></img>';;
        
        //Se esce un jack,regina o re
        
        if (carta%13 == 11){
            totaleBancone +=10
        }
        else if (carta%13 ==12){
            totaleBancone +=10
        }
        else if (carta%13 == 0){
            totaleBancone +=10
        }
        else if (carta%13 ==1 ){
            totaleBancone +=11
        }
        else {
            totaleBancone+=carta%13
        }
        
        console.log(totaleBancone);

        document.getElementById("PunteggioBanco").innerHTML = "Banco: ? +" + (totaleBancone - carta_coperta);
    }

    function Stai (){

        console.log(carta_coperta)

        document.getElementsByName("coperta")[0].src = "cards/"+carta_coperta + ".png"

        if (totaleBancone > totaleTu) {
            document.getElementById("Sconfitta").classList.remove("nascosto")
            document.getElementById("Sconfitta").classList.add("transizione")
        }

        else if (totaleTu > totaleBancone) {
            do{
                BancoCartaScoperta();
            }while (totaleBancone < totaleTu)
            if (totaleBancone > 21) {

            }
            if (totaleBancone == 21) {

            } 
        }


    }

    function TiraCarta(){

        draw.play();
    
        document.querySelectorAll("#carta").forEach(el => {
            el.classList.remove('animazione');
          });
    
    
        let carta = Math.floor(Math.random() * 52) + 1;

        while (carteUscite.includes(carta)){
            carta = Math.floor(Math.random() * 52) + 1;
        }

        carteUscite.push(carta);
    
        let path = "cards/" + carta + ".png";
    
        document.getElementById("Tu").innerHTML += '<img src="' + path + '" id="carta" class="animazione"></img>';
        
        if (carta%13 == 11){
            totaleTu +=10
        }
        else if (carta%13 ==12){
            totaleTu +=10
        }
        else if (carta%13 == 0){
            totaleTu +=10
        }
        else if (carta%13 == 1){
            totaleTu+=11
        }
        else {
            totaleTu+=carta%13
        }
        if (totaleTu > 21){
            document.getElementById("Sconfitta").classList.remove("nascosto")
            document.getElementById("Sconfitta").classList.add("transizione")
        }
        document.getElementById("PunteggioTu").innerHTML = "Tu:" + totaleTu
    }
    
    function Start (){

        totaleBancone =0;
        totaleTu = 0;
        AssiTu = 0;
        AssiBanco = 0;
        carteUscite = []
        document.getElementById("Tu").innerHTML = "";
        document.getElementById("Banco").innerHTML = "";
        document.getElementById("PunteggioTu").innerHTML = "Tu:";
        document.getElementById("PunteggioBanco").innerHTML = "Banco:"
    
        document.getElementById("menu").classList.add("nascosto")

        document.getElementById("Bancone").classList.remove("nascosto")
            
        setTimeout (BancoCartaCoperta,300);
            
        setTimeout (TiraCarta,1000)

        setTimeout (BancoCartaScoperta, 1600)
        
        setTimeout (TiraCarta,2300)
}

function esci(){
    document.getElementById("Sconfitta").classList.add("nascosto")
    document.getElementById("Bancone").classList.add("nascosto")
    document.getElementById("menu").classList.remove("nascosto")
}

function riprova(){
    totaleBancone =0;
    totaleTu = 0;
    AssiTu = 0;
    AssiBanco = 0;
    carteUscite = []
    document.getElementById("Tu").innerHTML = "";
    document.getElementById("Banco").innerHTML = "";
    document.getElementById("PunteggioTu").innerHTML = "Tu:";
    document.getElementById("PunteggioBanco").innerHTML = "Banco:"
    document.getElementById("Sconfitta").classList.add("nascosto")
    Start()
}

function puntata (){
    document.getElementById("bet").style.display="block";
}
function chiudiPuntata(){
    var Valorepuntata = document.getElementById("ValoreBet").value;
    if (Valorepuntata == ""){
        if (confirm("Non hai puntato niente,sicuro di voler continuare?")){
            document.getElementById("bet").style.display="none";
        }
    }
    else if (Valorepuntata > budget){
        alert ("Non hai tutti quei soldi,\nProva con una puntata più piccola!")
    }
    else{
        console.log (Valorepuntata)
        document.getElementById("bet").style.display="none";
    }
}

function Rules() {
    document.getElementById("rules").style.display="block";
}

function chiudiRules(){
        document.getElementById("rules").style.display="none";
}

/*function banco(){

    let numeroCasuale = Math.floor(Math.random() * 52) + 1;

    document.getElementById("Banco").innerHTML += '<img src="cards/back.png" id="carta"></img>';

    carta_coperta = numeroCasuale%13;
    
    console.log(carta_coperta);

}

function tu(){
    let numeroCasuale = Math.floor(Math.random() * 52) + 1;

    let path = "cards/" + numeroCasuale + ".png";

    document.getElementById("Tu").innerHTML += '<img src="' + path + '" id="carta"></img>';

    console.log(numeroCasuale%13);

}*/
