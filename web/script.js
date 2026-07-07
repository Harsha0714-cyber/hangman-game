let gameState = {};
const bodyParts = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];

async function newGame() {
    const response = await fetch('/api/game/new');
    gameState = await response.json();
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

async function guessLetter(letter, btn) {
    btn.disabled = true;
    
    const response = await fetch(`/api/game/guess/${letter}`);
    const result = await response.json();
    
    if (result.error) {
        return;
    }
    
    gameState = result;
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
