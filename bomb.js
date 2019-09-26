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
// TODO: add audio elements

// Event Listeners
wireBox.addEventListener('click', function(e) {
  var color = e.target.alt;
  if (!wireState[color] && !gameOver) {
    // If wire isn't cut and game isn't over...
    e.target.src = `img/cut-${color}-wire.png`;
    // TODO: play cut audio
    wireState[color] = true;
    // Check for correctness
    var wireIndex = wiresToCut.indexOf(color);
    if (wireIndex > -1) {
      // Correct wire cut
      console.log(`${color} at index ${wireIndex} was correct`);
      wiresToCut.splice(wireIndex, 1);
      // TODO: Check for a win here
    } else {
      // Incorrect wire cut
      console.log(`${color} at index ${wireIndex} was wrong`);
      // TODO: Kickoff the death delay
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
  // TODO: play the siren
  // TODO: start the countdown
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

  // TODO: Stop playing audio
  init();
}