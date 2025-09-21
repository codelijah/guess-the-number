'use strict';

const checkBtn = document.querySelector('.btn-check');
const guessInput = document.querySelector('.guess');
const secretNumber = document.querySelector('.number');
const secretNumberBox = document.querySelector('.number-box');
const displayMessage = document.querySelector('.message');
const displayScore = document.querySelector('.score');
const displayHighScore = document.querySelector('.highscore');
const againBtn = document.querySelector('.btn-again');
const resetHighScore = document.querySelector('.reset-highscore');
const toggleMusicBtn = document.querySelector('.toggle-music');

const bgMusic = new Audio('sounds/background.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.3;

toggleMusicBtn.addEventListener('click', function () {
  if (bgMusic.paused) {
    bgMusic.play();
    toggleMusicBtn.textContent = '🔇 Mute Music';
  } else {
    bgMusic.pause();
    toggleMusicBtn.textContent = '🎵 Play Music';
  }
});

let randomSecretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

highScore = Number(localStorage.getItem('highScore')) || 0;
displayHighScore.textContent = highScore;

checkBtn.addEventListener('click', function () {
  if (bgMusic.paused) {
    bgMusic.play();
  }
  const randomGuess = Number(guessInput.value);

  if (!randomGuess) {
    displayMessage.textContent = '⛔ No Number enterd!';
    displayMessage.style.color = '#facc15';
  } else if (randomGuess === randomSecretNumber) {
    secretNumber.textContent = randomSecretNumber;
    displayMessage.textContent = '🎯 Bullseye! You got it!';
    displayMessage.style.color = '#facc15';
    document.body.style.backgroundColor = '#22c55e';
    secretNumberBox.style.width = '30rem';
    // 🎉 fire confetti
    confetti();

    if (score > highScore) {
      highScore = score;
      displayHighScore.textContent = highScore;
      localStorage.setItem('highScore', highScore);
    }
  } else if (randomGuess !== randomSecretNumber) {
    if (score > 1) {
      displayMessage.textContent =
        randomGuess > randomSecretNumber
          ? 'Overshot! Try a smaller number.'
          : '📉 Too small! Guess higher.';
      displayMessage.style.color = '#f97316';
      score--;
      displayScore.textContent = score;
    } else {
      displayMessage.textContent = '😢 Out of guesses! Try again?';
      displayScore.textContent = 0;
      document.body.style.backgroundColor = '#ef4444';
    }
  }
});

resetHighScore.addEventListener('click', function () {
  highScore = 0;
  displayHighScore.textContent = highScore;
  localStorage.removeItem('highScore');
});

againBtn.addEventListener('click', function () {
  score = 20;
  randomSecretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage.textContent = 'Start guessing...';
  displayMessage.style.color = '#f5f5f5';
  displayScore.textContent = score;
  secretNumber.textContent = '?';
  guessInput.value = '';
  document.body.style.backgroundColor = '#222';
  secretNumberBox.style.width = '15rem';

  bgMusic.currentTime = 0;
  bgMusic.play();
});

