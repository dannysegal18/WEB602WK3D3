const pacMen = []; // This array holds all the pacmen

const pacmanHeight = 100;  // this will be the same as width
const pacmanWidth = 100;  // set a constant width for all pacman created
const positionScaler = 500;  // controls the starting position in pixel
const velocityScaler = 10;  // larger = faster movement in position

// This number controls the frames per second (fps).
// For animation (>= 24 fps), use number smaller than 42.
const refreshEvery = 40;  // refresh in millisecond (larger = laggier, smaller = smoothier);

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.max(50, Math.random() * scale),  // so that it doesn't cover the "Start the Game" button
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  let game = document.getElementById('game');

  // add image to <div id='game'>  
  let pacImg = document.createElement('img');
  pacImg.src = './images/PacMan1.png';
  game.appendChild(pacImg);

  // set size and position
  let position = setToRandom(positionScaler);  // 0 to 200
  pacImg.width = pacmanWidth;
  pacImg.style.position = 'absolute';
  pacImg.style.left = position.x;
  pacImg.style.top = position.y;

  // set return
  let velocity = setToRandom(velocityScaler);  // 0 to 10
  return {
    pacImg,
    position,
    velocity,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.pacImg.style.left = item.position.x;
    item.pacImg.style.top = item.position.y;
  });
  setTimeout(update, refreshEvery);
}

function checkCollisions(item) {
  let rb = window.innerWidth - pacmanWidth;  // right bound
  let lb = window.innerHeight - pacmanHeight;  // lower bound

  // reverse on horizontal
  if (item.position.x < 0 || item.position.x >= rb) {
    item.velocity.x *= -1;
  }

  // reverse on vertical
  if (item.position.y < 0 || item.position.y >= lb) {
    item.velocity.y *= -1;
  }
}

// function to be called upon click event on the button `addBtn`
function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

// don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}