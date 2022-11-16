'use strict';
// player section
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// score and current score
const score0El = document.querySelector('#score--0'); // score: score of every dice rolled
const current0El = document.getElementById('current--0'); //current score: total score

const score1El = document.querySelector('#score--1');
const current1El = document.getElementById('current--1');

//dice image
const diceEl = document.querySelector('.dice');

//buttons
//new game
const btnNew = document.querySelector('.btn--new');
//Rolling dice
const btnRoll = document.querySelector('.btn--roll');
//hold
const btnhold = document.querySelector('.btn--hold');

//Starting conditions: setting scores to be 0

let scores, currentScore , activePlayer , playing ;

const init = function(){
//hiding dice image
diceEl.classList.add('hidden');

 scores = [0, 0];
 currentScore = 0;
 activePlayer = 0;
 playing = true;

  score0El.textContent = 0;
  current0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner') ;
  player1El.classList.remove('player--winner') ;
  player0El.classList.add('player--active') ;
  player1El.classList.remove('player--active') ;
};

init();

//functii=on for switching player
const switchPlayer = function () {
  // setting current score to be 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // IF player is 0 switch to player 1 vice versa
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Setting score of new player to 0
  currentScore = 0;
  // changing background color of active player
  // if active class is there remove it else add it
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.display dice
    //removing hidden class to display dice
    diceEl.classList.remove('hidden');

    //selecting image according to the random number
    diceEl.src = `dice-${dice}.png`;
    //           Eg: dice-1.png

    //3. Check for rolled 1:if true, switch to nextPlayer

    if (dice !== 1) {
      //  1.add dice roll to current score
      currentScore = currentScore + dice;
      // displaying current score after each dice roll
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // if === 1
    } else {
      //switch player & all the score is lost i.e. set to zero

      switchPlayer();
    }
  }
});

// HOLDING SCORE
btnhold.addEventListener('click', function () {
  if (playing) {
    // 1.Add current score to total score.
    document.getElementById(`score--${activePlayer}`).textContent =
      currentScore;

    scores[activePlayer] += currentScore;
    //  scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. If score>=100 player wins else switch player

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
