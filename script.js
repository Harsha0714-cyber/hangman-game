let gameState = {};
const bodyParts = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];

// Word list for local game mode
const words = [
  "programming", "hangman", "computer", "keyboard", "terminal",
  "function", "variable", "network", "compiler", "algorithm",
  "pointer", "database", "software", "hardware", "debugger"
];

function newGame() {
    const word = words[Math.floor(Math.random() * words.length)];
    gameState = {
        word: word,
        display: '_'.repeat(word.length).split('').join(' '),
        wrong: [],
        wrongCount: 0,
        won: false,
        lost: false
    };
    updateDisplay();
    createKeyboard();
    document.getElementById('message').textContent = '';
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const btn = document.createElement('button');
        btn.textContent = letter.toUpperCase();
        btn.className = 'letter-btn';
        btn.onclick = () => guessLetter(letter, btn);
        btn.id = `btn-${letter}`;
        keyboard.appendChild(btn);
    }
}

function guessLetter(letter, btn) {
    btn.disabled = true;
    
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

    if (!gameState.display.includes('_')) {
        gameState.won = true;
    }

    if (gameState.wrongCount >= 6) {
        gameState.lost = true;
    }

    updateDisplay();

    if (gameState.won) {
        document.getElementById('message').textContent = '🎉 You Won!';
        document.getElementById('message').className = 'message win';
        disableAllButtons();
    } else if (gameState.lost) {
        document.getElementById('message').textContent = `😢 Game Over! Word: ${gameState.word}`;
        document.getElementById('message').className = 'message lose';
        disableAllButtons();
    }
}

function updateDisplay() {
    document.getElementById('wordDisplay').textContent = gameState.display;
    document.getElementById('wrongCount').textContent = gameState.wrongCount;
    document.getElementById('wrongLetters').textContent = gameState.wrong.join(', ') || 'None';
    
    // Update hangman
    bodyParts.forEach((part, index) => {
        const element = document.getElementById(part);
        if (gameState.wrongCount > index) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

function disableAllButtons() {
    const buttons = document.querySelectorAll('.letter-btn');
    buttons.forEach(btn => btn.disabled = true);
}

// Start game on load
window.onload = () => newGame();
