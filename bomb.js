console.log('loaded!');

// Variables
const STARTING_TIME = 30;
var remainingTime = 0;
var gameOver = false;
var countdown = null;
var delay = null;

var wireState = {
  blue: false,
  green: false,
  red: false,
  white: false,
  yellow: false
}

var wiresToCut = [];

// DOM References
var timer = document.getElementById('timer');
var wireBox = document.getElementById('wirebox');
var resetButton = document.querySelector('button');
var explode = document.getElementById('explode');
var yay = document.getElementById('yay');
var buzz = document.getElementById('buzz');
var siren = document.getElementById('siren');
var success = document.getElementById('success');

// Event Listeners
resetButton.addEventListener('click', reset);

wireBox.addEventListener('click', function(e) {
  var color = e.target.alt;
  if (!wireState[color] && !gameOver && color) {
    // If wire isn't cut and game isn't over...
    e.target.src = `img/cut-${color}-wire.png`;
    buzz.play();
    wireState[color] = true;
    // Check for correctness
    var wireIndex = wiresToCut.indexOf(color);
    if (wireIndex > -1) {
      // Correct wire cut
      console.log(`${color} at index ${wireIndex} was correct`);
      wiresToCut.splice(wireIndex, 1);
      if (checkForWin()) {
        endGame(true);
      }
    } else {
      // Incorrect wire cut
      console.log(`${color} at index ${wireIndex} was wrong`);
      delay = setTimeout(endGame, 750, false);
    }
  }
});

// Functions
function init() {
  wiresToCut.length = 0;
  remainingTime = STARTING_TIME;
  for (let wire in wireState) {
    var rand = Math.random();
    if (rand > 0.5) {
      wiresToCut.push(wire);
    }
  }
  console.log(wiresToCut);
  resetButton.disabled = true;
  document.getElementById('siren').play();
  countdown = setInterval(updateClock, 1000);
}

function reset() {
  // Marking all wires uncut
  for (let wire in wireState) {
    wireState[wire] = false;
  }
  var color;
  for (let i = 0; i < wireBox.children.length; i++) {
    color = wireBox.children[i].alt
    wireBox.children[i].src = `img/uncut-${color}-wire.png`;
  }
  gameOver = false;
  document.body.classList.remove('exploded');
  timer.classList.remove('green');
  clearTimeout(delay);
  clearInterval(countdown);

  success.pause();
  success.currentTime = 0;
  init();
}

function checkForWin() {
  return wiresToCut.length ? false : true;
}

function endGame(win) {
  clearTimeout(delay);
  clearInterval(countdown);
  gameOver = true;
  resetButton.disabled = false;

  if (win) {
    // we won!
    console.log("You saved the city!");
    timer.classList.add('green');
    yay.addEventListener('ended', function() {
      success.play();
    })
    yay.play();
  } else {
    // we lose!
    console.log('BOOM!!!');
    explode.play();
    document.body.classList.add('exploded');
  }

}

function updateClock() {
  remainingTime--;
  if (remainingTime <= 0) {
    endGame(false);
  }
  timer.textContent = `0:00:${remainingTime}`;
}

init();