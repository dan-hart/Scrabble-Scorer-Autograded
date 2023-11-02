// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
const readline = require('readline-sync');


const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

/*
Modify the provided initialPrompt() function to prompt the user to enter a word to score.
Use the oldScrabbleScorer() function provided to score the word provided by the user. Print the result to the console.
*/
function initialPrompt() {
   let word = readline.question("Please enter a word to score: ");
   let score = oldScrabbleScorer(word);
   console.log(`The score for '${word}' is: ${score}`);
};

/*
Define a function simpleScorer(word).
Inside the function, return the length of the word, which is equivalent to the score since each letter is worth 1 point.
Define a function vowelBonusScorer(word).
Inside the function, initialize a score variable to 0.
Iterate over each character in the word. If the character is a vowel, add 3 to the score. If it's a consonant, add 1 to the score.
Return the score.
*/
function simpleScorer(word) {
   return word.toLowerCase().length;
}

function vowelBonusScorer(word) {
   let score = 0;
   const vowels = ['a', 'e', 'i', 'o', 'u'];

   for (let char of word.toLowerCase()) {
      if (vowels.includes(char)) {
         score += 3;
      } else {
         score += 1;
      }
   }

   return score;
}

/*
Define a function scrabbleScorer(word).
Inside the function, initialize a variable score to 0.
Iterate over each character in word.
For each character, add the corresponding value from newPointStructure to score.
After iterating over all characters in word, return score.
*/
function scrabbleScorer(word) {
   let score = 0;

   for (let char of word.toLowerCase()) {
      score += newPointStructure[char];
   }

   return score;
}

/*
Define an array scoringAlgorithms.
Populate the array with three objects, each representing a scoring algorithm.
Each object should have three properties: name, description, and scoringFunction.
The name and description properties should be strings describing the scoring algorithm.
The scoringFunction property should be a reference to the corresponding scoring function.
*/
let scoringAlgorithms = [
   {
      scorerFunction: simpleScorer
   },
   {
      scorerFunction: vowelBonusScorer
   },
   {
      scorerFunction: scrabbleScorer
   }
];

/*
Define a function scorerPrompt().
Inside the function, use readline-sync's question method to prompt the user to enter a number to select a scoring algorithm.
Use a switch statement to handle the user's selection.
If the user enters 0, 1, or 2, return the corresponding object from the scoringAlgorithms array.
If the user enters anything else, print an error message and prompt the user again.
*/
function scorerPrompt() {
   let selection = readline.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ");

   switch (selection) {
      case '0':
         return scoringAlgorithms[0];
      case '1':
         return scoringAlgorithms[1];
      case '2':
         return scoringAlgorithms[2];
      default:
         console.log("Invalid selection. Please enter 0, 1, or 2.");
         return scorerPrompt();
   }
}

/*
   Define a function transform(oldPointStructure).
   Inside the function, create an empty object newPointStructure.
   Iterate over each key-value pair in oldPointStructure.
   For each key-value pair, iterate over each letter in the value array.
   For each letter, add a new key-value pair to newPointStructure where the key is the lowercase letter and the value is the key from oldPointStructure converted to a number.
   After iterating over all key-value pairs in oldPointStructure, return newPointStructure.
*/
function transform(oldPointStructure) {
   let newPointStructure = {};

   for (let point in oldPointStructure) {
      for (let letter of oldPointStructure[point]) {
         newPointStructure[letter.toLowerCase()] = Number(point);
      }
   }

   return newPointStructure;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let scoringObject = scorerPrompt();
   let score = scoringObject.scoringFunction(word);
   console.log(`Score for '${word}': ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
