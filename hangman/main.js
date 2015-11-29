/**
 * @author       Javier Valencia Romero <javiervalenciaromero@gmail.com>
 * @copyright    Javier Valencia Romero
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * HANGMAN game for nodejs terminal
 */

/*
 * Returns a new Array built of the result of concatenate n times
 * the same string
 *
 * @param {string} data
 * @param {number} times
 * @return {array}
 */
function joinStringNTimes(data, times) {
  return new Array(times + 1).join(data);
}

/*
 * Return the state of the game
 *
 * @param {object} state
 * @return {string}
 */
function checkGameState(state) {
  if (state.lives === 0) {
    return 'lose'; // Lose
  } else if (state.hidden === state.word) {
    return 'win';
  } else {
    return 'continue';
  }
}

/*
 * Launch the game
 *
 * @param {object} state
 */
function run(state) {
    switch (checkGameState(state)) {
      case 'lose':
        console.log('GAME OVER...good luck for next time!');
        rl.close();
        break;
      case 'win':
        console.log('YOU WIN! The secret word was: ' + state.hidden);
        rl.close();
        break;
      case 'continue':
        rl.question("Guess a letter: ", function(answer) {
          if (typeof answer === 'string' && answer.length === 1) {
            var letterPosition = state.word.indexOf(answer);
            if (letterPosition === -1) {
              // Wrong guess
              console.log('"' + answer + '"' + ' is not in the hidden word');
              console.log(state.lives - 1 + ' lives left');
              console.log(state.hidden);
              run({ 
                'word': state.word, 
                'hidden': state.hidden, 
                'lives': state.lives - 1 
              });
            } else {
              // Success
              console.log('Right guess!');
              var showLetter = 
                  state.hidden.slice(0, letterPosition) + 
                  answer + 
                  state.hidden.slice(letterPosition + 1, hiddenWord.length);
              console.log(showLetter);
              run({ 
                'word': state.word, 
                'hidden': showLetter, 
                'lives': state.lives 
              });
            }
          } else {
            console.log('Please introduce a letter...');
            console.log(state.hidden);
          }
        });
        break;
    }
}

// Create nodejs io interface
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Init game
var dictionary = ['donkey', 'house', 'table'],
    lives = 6,
    chosenWord = dictionary[
      Math.floor(Math.random() * dictionary.length)
    ],
    hiddenWord = joinStringNTimes('_', chosenWord.length);

console.log('*** HANG MAN GAME ***');
console.log(hiddenWord);
run({ 'word': chosenWord, 'hidden': hiddenWord, 'lives': 6 });