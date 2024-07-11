const allMoves = [
  { move:'rock' , weakTo: 'paper', strongTo:'scissors'},
  { move:'paper', weakTo: 'scissors', strongTo:'rock'},
  { move:'scissors' , weakTo: 'rock', strongTo:'paper'}
]

let totalPoints = {
  userPoints: 0,
  computerPoints: 0
};

const playerTurnInd = document.querySelector('.player-icon');
const computerTurnInd = document.querySelector('.computer-icon');

export let isPlayerTurn = 1;
let endTurn;
let newTurn;
function changeTurn(){
  isPlayerTurn = !isPlayerTurn;

  if(!isPlayerTurn){
    endTurn = playerTurnInd;
    newTurn = computerTurnInd;
  } else{
    endTurn = computerTurnInd;
    newTurn = playerTurnInd;
  }
  
  endTurn.classList.remove(`turn-active-${endTurn.dataset.player}`);
  newTurn.classList.add(`turn-active-${newTurn.dataset.player}`);
}

const popEffect = document.querySelector('.pop-sound');
export function runRPS(playerMoveName){
  changeTurn();
  let playerMove = allMoves.find(moveObj => {return moveObj.move === playerMoveName});
  if(!playerMove){
    alert('Invalid Player Move!');
    return null;
  }
  let computerMove = getComputerMove();
  let points = getRoundPoint(playerMove, computerMove);
  updateTotalPoints(points);
  setTimeout(() => {
    initiateComputerMove(computerMove.move); 
    setTimeout(() => {
      updateScoreBoard();
      resetChoices();
      changeTurn();
      popEffect.play();
    }, 1500);
  }, Math.floor(Math.random() * 750) + 500);

}

function getComputerMove(){
  let index = Math.floor((Math.random()) * 3);
  return allMoves[index];
}

function getRoundPoint(pMove, eMove){
  if(pMove.move === eMove.weakTo){
    return [1, 0];
  } else if(pMove.move === eMove.strongTo){
    return [0, 1];
  } else {
    return [0, 0];
  }
} 

function updateTotalPoints(newPoints){
  totalPoints.userPoints += newPoints[0];
  totalPoints.computerPoints += newPoints[1];
}

const userScoreElem = document.querySelector('.player-score');
const computerScoreElem = document.querySelector('.computer-score');

function updateScoreBoard(){
  userScoreElem.innerHTML = totalPoints.userPoints;
  computerScoreElem.innerHTML = totalPoints.computerPoints;
}


const computerMoveElements = {
  "rock": document.querySelector('.computer-rock'),
  "paper": document.querySelector('.computer-paper'),
  "scissors": document.querySelector('.computer-scissors')
}

function initiateComputerMove(computerMove){
  computerMoveElements[computerMove].classList.toggle('btn-active');
}

function resetChoices() {
  document.querySelectorAll('.btn-active').forEach(element => {
    element.classList.remove('btn-active')
  })
}