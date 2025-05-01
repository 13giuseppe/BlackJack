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
var tirare = true;
var winstreak = 0;
var Valorepuntata = 0
var winstreak = 0;
var i=3;



draw.volume = 1;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function BlackJackCheck (){
        if (totaleBancone == 21){
            document.getElementsByName("coperta")[0].src = "cards/"+ carteUscite[0] + ".png"
            document.getElementById("PunteggioBanco").innerHTML = "Banco: " + (totaleBancone);
            setTimeout(function() {
                alert("L'avversario ha fatto BlackJack!");
            }, 200);
            Sconfitta()
        }
        if (totaleTu == 21){
            alert("Hai fatto BlackJack! 1.5x ")
            Valorepuntata = Valorepuntata * 1.5;
            Vittoria()
        }
    }

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
            AssiBanco ++
        }
        else {
            totaleBancone+=carta%13
            carta_coperta = carta%13;
        }

        if (totaleBancone > 21 && AssiBanco > 0){
            totaleBancone -= 10
            AssiBanco --;
        }

        console.log(carta_coperta)
        
        console.log(totaleBancone);

    }
    
    async function BancoCartaScoperta(){



        
        document.querySelectorAll("#carta").forEach(el => {
            el.classList.remove('animazione');
          });
        
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
            AssiBanco ++
        }
        else {
            totaleBancone += carta % 13
        }
        
        console.log(totaleBancone);

        if (!tirare){
            document.getElementById("PunteggioBanco").innerHTML = "Banco: " + (totaleBancone);
        }
        else{
            document.getElementById("PunteggioBanco").innerHTML = "Banco: ? +" + (totaleBancone - carta_coperta);
        }

    }

    async function Stai (){

        tirare = false
        
        document.getElementsByName("coperta")[0].src = "cards/"+ carteUscite[0] + ".png"

        console.log(carteUscite[0])

        document.getElementById("PunteggioBanco").innerHTML= "Banco:" + totaleBancone

        if (totaleBancone > totaleTu) {
            document.getElementById("Sconfitta").classList.remove("nascosto")
            document.getElementById("Sconfitta").classList.add("transizione")
        }

        else if (totaleTu > totaleBancone) {
            do{
                await sleep(800)
                await BancoCartaScoperta()
            }while (totaleBancone < totaleTu)
            if (totaleBancone > 21) {
                Vittoria()
            }
            else if (totaleBancone > totaleTu) {
                Sconfitta()
            } 
        }
        else if (totaleTu == totaleBancone) {
            document.getElementById("Pareggio").classList.remove("nascosto")
        }
        
        document.getElementById("Tira").disabled = true
        document.getElementById("Stai").disabled = true
        document.getElementById("Double").disabled = true

    }

    function TiraCarta(){

        draw.play();
        
        // Per ogni ELEMENTO della lista che riporta querySelectorAll fai ...
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
            AssiTu ++
        }
        else {
            totaleTu+=carta%13
        }
        
        if (totaleTu > 22 && AssiTu > 0){
            totaleTu -= 10
            AssiTu --;
        }

        if (totaleTu > 21){
            Sconfitta()
        }

        if (carteUscite.length > 3 ){
            if (tirare){
                document.getElementById("Double").disabled = true;
            }
            if (totaleTu == 21){
                Stai()
            }
        }

        document.getElementById("PunteggioTu").innerHTML = "Tu:" + totaleTu


    }
    
    function Double(){
        
        tirare = false;

        Valorepuntata = Valorepuntata * 2;

        TiraCarta()

    }

    function Start (){

        console.log (document.getElementById("Double").disabled)

        tirare = true
        document.getElementById("Tira").disabled = false
        document.getElementById("Stai").disabled = false
        document.getElementById("Double").disabled = false
        totaleBancone = 0;
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
        
        document.getElementById("Dati").classList.remove("nascosto");

        if (Valorepuntata != 0){
            document.getElementById("Dati").innerHTML = `<h1 style ="font-size: 100px">Puntata: ${Valorepuntata}€</h1>`;
        }
        else {
            document.getElementById("Dati").innerHTML = "";
        }

        document.getElementById("Dati").innerHTML += '<h1 style="font-size: 100px;">Vittorie consecutive: '+ winstreak +'</h1>'

        setTimeout (BancoCartaCoperta,300);
            
        setTimeout (TiraCarta,1000)

        setTimeout (BancoCartaScoperta, 1600)
        
        setTimeout (TiraCarta,2300)
        
        setTimeout (BlackJackCheck, 2600)

        
}

function esci(){
    document.getElementById("Sconfitta").classList.add("nascosto")
    document.getElementById("Vittoria").classList.add("nascosto")
    document.getElementById("Dati").classList.add("nascosto")
    document.getElementById("Bancone").classList.add("nascosto")
    document.getElementById("menu").classList.remove("nascosto")
    document.getElementById("Pareggio").classList.add("nascosto")
}

function riprova(){
    totaleBancone =0;
    totaleTu = 0;
    AssiTu = 0;
    AssiBanco = 0;
    carteUscite = [];
    document.getElementById("Tu").innerHTML = "";
    document.getElementById("Banco").innerHTML = "";
    document.getElementById("PunteggioTu").innerHTML = "Tu:";
    document.getElementById("PunteggioBanco").innerHTML = "Banco:"
    document.getElementById("Sconfitta").classList.add("nascosto")
    document.getElementById("Pareggio").classList.add("nascosto")
    Start()
}

function Continua(){
    totaleBancone = 0;
    totaleTu = 0;
    AssiTu = 0;
    AssiBanco = 0;
    carteUscite = [];
    document.getElementById("Tu").innerHTML = "";
    document.getElementById("Banco").innerHTML = "";
    document.getElementById("PunteggioTu").innerHTML = "Tu:";
    document.getElementById("PunteggioBanco").innerHTML = "Banco:"
    document.getElementById("Vittoria").classList.add("nascosto")
    document.getElementById("Pareggio").classList.add("nascosto")
    Start()
    console.log(winstreak)
}


function puntata (){
    document.getElementById("Budget").innerHTML=budget + "€";
    document.getElementById("bet").style.display="block";
}

function chiudiPuntata(){
    Valorepuntata = document.getElementById("ValoreBet").value;
    if (Valorepuntata == 0 || Valorepuntata == ""){
        if (confirm("Non hai puntato niente,sicuro di voler continuare?")){
            document.getElementById("bet").style.display="none";
        }
    }
    else if (Valorepuntata > budget){
        alert ("Non hai tutti quei soldi,\nProva con una puntata più piccola!")
    }
    else{
        
        document.getElementById("bet").style.display="none";
    }
    console.log (Valorepuntata)
}

function Vittoria (){
    budget += Valorepuntata
    document.getElementById("Vittoria").classList.remove("nascosto")
    document.getElementById("Vittoria").
    document.getElementById("Tira").disabled = true
    document.getElementById("Stai").disabled = true
    document.getElementById("Double").disabled = true
    winstreak++;
}

function Sconfitta (){
    budget -= Valorepuntata
    document.getElementById("Sconfitta").classList.remove("nascosto")
    document.getElementById("Tira").disabled = true
    document.getElementById("Stai").disabled = true
    document.getElementById("Double").disabled = true
    winstreak = 0;
}

function Rules() {
    document.getElementById("rules").style.display="block";
}

function chiudiRules(){
        document.getElementById("rules").style.display="none";
}
