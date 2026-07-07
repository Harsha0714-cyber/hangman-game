# Hangman Game

## Description

This project is a classic Hangman game built with C and deployed as an interactive web application. The game randomly selects a word from a list of programming-related terms and challenges the player to guess the word within 6 wrong attempts.

## Files

- **hangman.c** → Main game logic in C
- **index.html** → Web interface
- **style.css** → Styling for the web interface
- **script.js** → Frontend game logic
- **server.js** → Node.js backend server
- **.gitignore** → Git ignore configuration
- **package.json** → Node.js dependencies

## How to Run

### Prerequisites
- Node.js installed
- npm installed

### Steps

1. Clone the repository:
   ```
   git clone https://github.com/Harsha0714-cyber/hangman-game.git
   cd hangman-game
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## Example

**Game Flow:**
- The game starts with a hidden word (displayed as underscores)
- Player guesses one letter at a time
- Correct guesses reveal the letter in the word
- Wrong guesses add parts to the hangman drawing
- Win by guessing the word before 6 wrong attempts
- Lose if the hangman is completed before guessing the word

**Sample Gameplay:**
```
Word: _ _ _ _ _ _ _ _

Guess: 'a'
Word: _ _ _ _ _ _ a _

Guess: 'z'
Wrong count: 1/6

... continue until win or loss
```
