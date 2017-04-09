// TODO: Encapsulate values more
// TODO: Refactor for game objects
// TODO: collision with blocks
// TODO: scoring system
// TODO: game over conditions

// game screen constants
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const FPS = 30;

// player variables
var lives = 3;

var Ball = function() {
  this.radius = 10;

  this.position = {
    x: 100,
    y: 100
  };

  this.velocity = {
    x: 5,
    y: 5
  };

  this.color = randomColor();

  this.move = function() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  this.checkCollision = function(obj) {
    // bounding box = x1, x2, y1, y2
    var x1 = this.position.x + this.velocity.x;
    var x2 = this.position.x + this.velocity.x;
    var y1 = this.position.y + this.velocity.y;
    var y2 = this.position.y + this.velocity.y;

    var ox1 = obj.position.x;
    var ox2 = obj.position.x + obj.width;
    var oy1 = obj.position.y;
    var oy2 = obj.position.y + obj.height;

    collidingX = x2 >= ox1 && x1 <= ox2;
    collidingY = y2 >= oy1 && y1 <= oy2;

    if (collidingX && collidingY) {
      // TODO: reflect ball x speed based on where the collision is taking place
      // this.velocity.x *= -1;
      this.velocity.y *= -1;
    }
  }

  this.screenCollision = function(w, h) {
    collidingX = (this.position.x + this.velocity.x) >=w || (this.position.x + this.velocity.x <= 0);
    collidingY = (this.position.y + this.velocity.y) >= h|| (this.position.y + this.velocity.y <= 0);
    if (collidingX) {
      this.velocity.x *= -1;
    }
    if (collidingY) {
      this.velocity.y *= -1;
    }
  }
}

var Paddle = function() {
  this.width = SCREEN_WIDTH / 4;
  this.height = this.width / 8;
  
  this.position = {
    x: (SCREEN_WIDTH / 2) - (this.width / 2),
    y: SCREEN_HEIGHT - this.height * 1.5
  };
  
  this.velocity = 0;
  
  this.direction = 0;
  
  this.color = randomColor();
  
  this.move = function() {
    switch(this.direction) {
      case -1: // moving left
        this.velocity -= 1;
        if (this.velocity <= -10) {
          this.velocity = -10;
        }
        break;
      case 0: // stopped
        if (this.velocity > 0) {
          this.velocity -= 1;
        }
        if (this.velocity < 0) {
          this.velocity += 1;
        }
        if (this.velocity = 0) {
          this.velocity = 0;
        }
        break;
      case 1: // moving right
        this.velocity += 1;
        if (this.velocity >= 10) {
          this.velocity = 10;
        }
        break;
    }
    
    this.position.x += this.velocity;
  }
  
  this.screenCollision = function(w) {
    if (this.position.x + this.width + this.velocity >= w ||
        this.position.x + this.velocity <= 0) {
          this.direction = 0;
        }
  }    
}

var gameBall = new Ball();
var gamePaddle = new Paddle();

// block values
var blockPadding = 4;
var blocksInRow = 6;
var blockRows = 5;
var blockWidth = ((SCREEN_WIDTH - (blocksInRow * 2) * blockPadding)/ blocksInRow);
var blockHeight = blockWidth / 8;
var blockColor = randomColor();
var blocks = [];

window.addEventListener("load", function(e) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.setAttribute("height", SCREEN_HEIGHT);
  canvas.setAttribute("width", SCREEN_WIDTH);
  document.body.appendChild(canvas);

  var resetBtn = document.createElement("button");
  resetBtn.innerHTML = "Reset Game";
  document.body.appendChild(resetBtn);

  resetBtn.addEventListener("click", function() {
    lives = 3;
    reset();
  });

  window.addEventListener("keydown", function(e) {
    switch(e.code) {
      case "KeyA":
      case "ArrowLeft":
        gamePaddle.direction = -1;        
        break;
      case "KeyD":
      case "ArrowRight":
        gamePaddle.direction = 1;        
        break;
    }
  });

  window.addEventListener("keyup", function(e) {
    gamePaddle.direction = 0;
  });

  window.setInterval(function() {
    detectCollision();
    updatePosition();
    drawScreen();
  }, 1000 / FPS);

});

function detectCollision() {
  gameBall.screenCollision(SCREEN_WIDTH, SCREEN_HEIGHT);
  gameBall.checkCollision(gamePaddle);
  
  gamePaddle.screenCollision(SCREEN_WIDTH);
}

function updatePosition() {
  gamePaddle.move()
  gameBall.move();
}

function drawScreen() {
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  // clear the screen
  drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "black", ctx);
  // draw some blocks
  for (var i = 0; i < blockRows; i++) {
    for (var j = 0; j < blocksInRow; j++) {
      var blockPositionX = j * (blockWidth + (blockPadding * 2)) + blockPadding;
      var blockPositionY = i * (blockHeight + (blockPadding * 1.5)) + blockPadding;

      drawRect(blockPositionX, blockPositionY, blockWidth, blockHeight, blockColor, ctx);
    }
  }
  // draw the paddle
  drawRect(gamePaddle.position.x, gamePaddle.position.y, gamePaddle.width, gamePaddle.height, gamePaddle.color, ctx);
  // draw the ball
  drawCircle(gameBall.position.x, gameBall.position.y, gameBall.radius, gameBall.color, ctx);
}

function reset() {
  
}

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

function randomColor() {
  var r = 255 * Math.random() | 0;
  var g = 255 * Math.random() | 0;
  var b = 255 * Math.random() | 0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
