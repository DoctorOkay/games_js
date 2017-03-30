// game constants
function Game() {
  this.SCREEN_WIDTH = 800;
  this.SCREEN_HEIGHT = 600;
  this.FPS = 30;
  this.ID = 0;
  this.PAUSED = false;
  this.PLAYING = true;
} // end Game object

// objects for the game
function Block() {
  this.width = 196;
  this.height = 30;
  this.padding = 2;
  this.position = {
    x: 0,
    y: 0
  };
  this.color = 'white'
} // end Block object

function Paddle() {
  this.width = 200;
  this.height = 30;
  this.velocity = 5;
  this.color = 'white';
  this.position = {
    x: 550,
    y: 300
  };
} // end Paddle object

function Ball() {
  this.radius = 10;
  this.color = 'white';
  this.velocity = {
    x: 5,
    y: 5
  };
  this.position = {
    x: 100,
    y: 100
  };

  this.move = function() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
} // end Ball object

// initialize creates the canvas and all game, block, paddle and ball objects
function init() {
  var GAME = new Game();
  // create canvas for the game
  GAME.canvas = document.createElement('canvas');
  GAME.canvas.setAttribute('height', GAME.SCREEN_HEIGHT);
  GAME.canvas.setAttribute('width', GAME.SCREEN_WIDTH);
  GAME.canvas.style.background = 'black';
  GAME.context = GAME.canvas.getContext('2d');
  document.body.appendChild(GAME.canvas);
  // create drawing context
  // compute block rows and add to game
  // create ball object and add to game
  GAME.BALL = new Ball();
  // create paddle object and add to game
  var paddle = new Paddle();
  paddle.width = GAME.SCREEN_WIDTH  / 6;
  paddle.height = paddle.width / 8;
  paddle.position = {
    x: (GAME.SCREEN_WIDTH / 2) - (paddle.width / 2),
    y: GAME.SCREEN_HEIGHT - paddle.height - 10
  };
  GAME.PADDLE = paddle;

  // create event listenter for player movement
  GAME.ID = window.setInterval(function() {
    update(GAME);
  }, 1000 / GAME.FPS);
} //end init

function update(game) {
  // detectCollision();
  // update player position
  // update ball position
  game.BALL.move();
  draw(game);
} // end update

function draw(game) {
  // draw blocks
  // for block in game.BLOCKS {
  //   drawRect(block.x, block.y, block.w, block.h, block.color, game.context);
  // }
  // draw paddle
  var paddle = game.PADDLE;
  drawRect(paddle.position.x, paddle.position.y, paddle.width, paddle.height, paddle.color, game.context);
  // draw ball
  var ball = game.BALL;
  drawCircle(ball.position.x, ball.position.y, ball.radius, ball.color, game.context);
} // end draw

function detectCollision() {
  // global collision detection
}

function gameOver(game) {
  game.PLAYING = false;
  window.clearTimeout(game.ID);
} // end gameOver

function pauseGame(game) {
  game.PAUSED = true;
} // end pauseGame

// drawing utilities
function drawRect(x, y, w, h, color, ctx) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color, ctx) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.fill();
}

init();
