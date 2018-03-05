/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1 or two times 6, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game or the score set by the input score.

*/

var scores, roundScore, activePlayer, dice, gamePlaying;

init();

var lastDice;


document.querySelector('.btn-roll').addEventListener('click', function () {
 if (gamePlaying){
    //1.Random number
    var dice = Math.floor(Math.random()*6)+1;
                                     
    //2.Display the result
    var diceDOM = document.query('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-0' + dice + '.png';

    //3.Update the round score IF the rolled number was not 1, when the dice is roll two times 6 a player looses
    if (dice === 6 &&& lastDice === 6){
        ///Player loooses score
        scores[activePlayer]=0;
        document.querySelector('#score-' + activePlayer).textContent = 0;
        nextplayer();
    } if else (dice !== 1) {
        //Add score
        roundScore += dice;
        document.querySelector('#current-0' + activePlayer).textContent = roundScore;
    } else{
        //Next player
        nextplayer();
    }
    //variable to save the value of the dice 
    lastDice = dice; 
 }                                                
});

document.querySelector('.btn-hold').addEventListener('click', function(){
 if (gamePlaying){
    //Add Current scre to global Score
    scores[activePlayer] += roundScore;                   
                                               
    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
     
    var input =  document.querySelector('.final-score').value;
    
    //undefined, 0, null or "" are coerced to false
    //Anything else is coersed to true
    //set input score whatever number user set or 100
     if (input){
      var winningScore = input;
     }else{
         winningScore = 100;
     }  
     
    //Check if the player won the game
    if (scores[activePlayer] >=winningScore){
     document.querySelector('#name-' +activePlayer).textContent = 'Winner!';
     //hide the dice
     document.querySelector('.dice').style.display = 'none';
     //change the color of the player
     document.querySelector('.player-' +activePlayer+ '-panel').classList.add('winner');
     document.querySelector('.player-' +activePlayer+ '-panel').classList.remove('active');
     gamePlaying =  false;
    } else {
     //Next player
    nextplayer();
    }    
 }
});

//function to change player and active values
function nextplayer (){
  //Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
  //reset the score when dice is 0
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  //toggle means if the button is active would do oppositive
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //hide the dice
  document.querySelector('.dice').style.display = 'none';
}

//add event for new game

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
scores = [0,0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;

//hide the dice
document.querySelector('.dice').style.display = 'none';
//reset the score 
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;
//reset the name of the player
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
//change the color of the player
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel' ).classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel' ).classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}