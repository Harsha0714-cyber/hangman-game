const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from web directory
app.use(express.static(path.join(__dirname)));

// Game logic
const MAX_WRONG = 6;
const words = [
  "programming", "hangman", "computer", "keyboard", "terminal",
  "function", "variable", "network", "compiler", "algorithm",
  "pointer", "database", "software", "hardware", "debugger"
];

let gameState = {
  word: '',
  display: '',
  wrong: [],
  wrongCount: 0,
  won: false,
  lost: false
};

function pickWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function initGame() {
  const word = pickWord();
  gameState = {
    word: word,
    display: '_'.repeat(word.length).split('').join(' '),
    wrong: [],
    wrongCount: 0,
    won: false,
    lost: false
  };
  return gameState;
}

function checkGuess(letter) {
  const word = gameState.word;
  const display = gameState.display.split(' ');
  let found = false;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      display[i] = letter;
      found = true;
    }
  }

  gameState.display = display.join(' ');

  if (!found) {
    if (!gameState.wrong.includes(letter)) {
      gameState.wrong.push(letter);
      gameState.wrongCount++;
    }
  }

  // Check win
  if (!gameState.display.includes('_')) {
    gameState.won = true;
  }

  // Check loss
  if (gameState.wrongCount >= MAX_WRONG) {
    gameState.lost = true;
  }

  return gameState;
}

// Routes
app.get('/api/game/new', (req, res) => {
  initGame();
  res.json({
    display: gameState.display,
    wrongCount: gameState.wrongCount,
    maxWrong: MAX_WRONG,
    wrong: gameState.wrong,
    message: 'Game started!'
  });
});

app.get('/api/game/guess/:letter', (req, res) => {
  const letter = req.params.letter.toLowerCase();

  if (gameState.wrong.includes(letter) || gameState.display.includes(letter)) {
    return res.json({ error: 'Already guessed' });
  }

  checkGuess(letter);

  res.json({
    display: gameState.display,
    wrongCount: gameState.wrongCount,
    maxWrong: MAX_WRONG,
    wrong: gameState.wrong,
    won: gameState.won,
    lost: gameState.lost,
    word: gameState.won || gameState.lost ? gameState.word : null
  });
});

app.get('/api/game/state', (req, res) => {
  res.json({
    display: gameState.display,
    wrongCount: gameState.wrongCount,
    maxWrong: MAX_WRONG,
    wrong: gameState.wrong,
    won: gameState.won,
    lost: gameState.lost
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
