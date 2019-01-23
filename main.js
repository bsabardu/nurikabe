$(document).ready(function() {

///Game List
const game1 = [
    [0,0,0,0,2,0,0],
    [0,0,0,0,0,2,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,6,0,0,0,0,4],
    [0,0,2,0,0,0,0],
    [0,0,0,0,2,0,2],
    [0,0,0,0,0,0,0],
    [0,9,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [2,0,0,0,0,0,0],
  ];

const game2 = [
    [0,0,0,0,0,0,0],
    [0,2,0,2,0,2,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,2,0,0,0,0,2],
    [0,0,0,0,0,0,0],
    [0,2,0,2,0,4,0],
    [0,0,0,0,0,0,0],
    [0,0,3,0,0,2,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,4],
  ];


const game3 = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,6,0,0],
    [0,2,0,0,0,0,0],
    [2,0,0,0,0,0,0],
    [0,0,0,0,0,2,0],
    [0,2,0,2,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,2,0],
    [0,0,2,0,0,0,0],
    [2,0,0,0,3,0,0],
    [0,0,0,0,0,0,0],
  ];
 
// Tableau de victoires
const victoire1 = [
    [1,1,1,0,0,1,1],
    [1,0,1,1,1,0,1],
    [1,0,0,0,1,0,1],
    [1,0,1,1,1,1,1],
    [1,0,1,0,0,0,0],
    [1,1,0,1,1,1,1],
    [0,1,0,1,0,1,0],
    [0,1,1,1,0,1,0],
    [0,0,0,0,1,1,1],
    [1,1,1,0,0,0,1],
    [0,0,1,1,1,1,1],
  ];

const victoire2 = [
    [1,1,1,1,1,1,1],
    [1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1],
    [1,1,1,1,1,1,0],
    [1,0,0,1,0,1,0],
    [1,1,1,1,0,0,1],
    [0,0,1,0,1,0,1],
    [1,1,1,0,1,1,1],
    [1,0,0,1,0,0,1],
    [1,0,1,1,1,1,1],
    [1,1,1,0,0,0,0],
  ];

const victoire3 = [
    [1,1,1,1,1,1,1],
    [1,0,1,0,0,0,1],
    [1,0,1,0,1,1,1],
    [0,1,0,0,1,0,1],
    [0,1,1,1,1,0,1],
    [1,0,1,0,1,1,1],
    [1,0,1,0,1,0,1],
    [1,1,1,1,1,0,1],
    [0,1,0,1,0,1,1],
    [0,1,0,1,0,0,1],
    [1,1,1,1,1,1,1],
  ];

// Tableau du joueur mis à jour quand il selectionne des cases
let joueur = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
  ];

//Declaration des variables globales
let actualGame = [];
let victoryBoard =[];
let timerTime = null;


//Fonction pour updater le board en fonction du jeu de départ
function inputBoard(game){
    let arrayLignes = document.getElementById('board').rows
        for (i=0;i<arrayLignes.length;i++){
            let arrayCases = arrayLignes[i].cells;
            for (j=0;j<arrayCases.length;j++){
                arrayCases[j].textContent = game[i][j];
            }
        }
    }

//Fonction pour générer aléatoirement un board de départ
function randomGame() {
    let rand = Math.random();
    if (rand < 0.33){
    actualGame = game1;
    victoryBoard = victoire1;
    } else if (rand < 0.66){
    actualGame = game2;
    victoryBoard = victoire2;
    }
    else {
    actualGame = game3;
    victoryBoard = victoire3;
    }
    return actualGame;
}

//Fonction pour aller au jeu suivant
function nextGame(){
    switch (actualGame){
        case game1:
        actualGame = game2;
        break;
        case game2:
        actualGame = game3;
        break;
        case game3:
        actualGame = game1;
        break;
    }
    return actualGame;
}

///Selection des cases
$('#board td').click(function(){
    $(this).toggleClass("selected")
    let tr = this.parentNode;
    $(tr).addClass('activeTr');
    let indexTr = $('#board tr').index(tr)
    let indexTd = $('.activeTr td').index(this);
    joueur[indexTr][indexTd] = (joueur[indexTr][indexTd] === 0) ? 1 : 0;
    $(tr).removeClass('activeTr');
})

//Toggle rules
$('.rulestitle').click(function() {
    $('i', this).toggleClass('fa-rotate-90');
    $( ".rulestext" ).toggle();
    });


//Objet timer 
let timer = {
    constructor(hours,minutes,secondes){
        this.hours = hours;
        this.minutes = minutes;
        this.secondes = secondes;
    },

    //Methode pour ajouter du temps
    addTime(s){
        if (timer.minutes === 59 && (timer.secondes + s) >= 60){
            timer.hours++
            timer.minutes = 0
            timer.secondes = (timer.secondes + s) - 60
        } else if (timer.secondes + s >= 60){
            timer.minutes++
            timer.secondes = (timer.secondes + s) - 60  
        } else {
            timer.secondes = timer.secondes + s
        }
    },

    //Methode pour l'afficher en front
    display(){
        $('#timer').text(timer.hours + ":" + timer.minutes + ":"+ timer.secondes);
    },

    //Methode pour reset le timer
    reset(){
        this.constructor(0,0,0);
    }
};


///Reset - Au clic sur new
$('#reset').click(function(){
    $('td').removeClass("selected"); //Supprime les cases selectionnées
})
  
//NEW - Au clic sur new 
$('#new').click(function(){

    //Lance ou relance le timer
    timer.reset();
    clearInterval(timerTime);
    timerTime = setInterval(function(){
        timer.addTime(1);
        timer.display();
    },1000);


    //Affiche le tableau de jeux
    $('#gameplay').show();

    //Génère un jeu aléatoirement si première partie sinon la suivante.
    actualGame.length === 0 ?  inputBoard(randomGame()) : inputBoard(nextGame());

    //Cache les règles
    $('.newtext').hide();
})

//Check
$('#check').click(function(){
if (joueur.toString()===victoryBoard.toString()){
    $('.wintext').css('display','table-cell');
    $('#timecompleted').text(timer.hours + ":" + timer.minutes + ":"+ timer.secondes)
    $('#gameplay').hide()

} else {

    //Affiche le text lose pendant 2s
        $('.losetext').css('display','table-cell')
        setTimeout(
            function() 
            {
           $('.losetext').css('display','none');
            }, 2000);

        $('#gameplay').hide()
        setTimeout(
            function() 
            {
           $('#gameplay').css('display','block');
            }, 2000);
    
    
    //Ajouter une pénalité de 15s
    timer.addTime(15);

}
})

})


