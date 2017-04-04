// TODO: Encapsulate values more

// game screen constants
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const FPS = 30;

// player variables
var lives = 3;

// ball values
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
      // TODO: deflect ball x speed based on where the collision is taking place
      // this.velocity.x *= -1;
      this.velocity.y *= -1;
    }
  }

  this.screenCollision = function(screenWidth, screenHeight) {
    collidingX = (this.position.x + this.velocity.x) >=screenWidth || (this.position.x + this.velocity.x <= 0);
    collidingY = (this.position.y + this.velocity.y) >= screenHeight|| (this.position.y + this.velocity.y <= 0);
    if (collidingX) {
      this.velocity.x *= -1;
    }
    if (collidingY) {
      this.velocity.y *= -1;
    }
  }
}

var gameBall = new Ball();

var ballRadius = 10;
var ballPositionX = (SCREEN_WIDTH / 2) - (ballRadius / 2);
var ballPositionY = (SCREEN_HEIGHT / 2) - (ballRadius / 2);
var ballSpeedX = 5;
var ballSpeedY = 5;

// paddle values
var paddleWitdh = SCREEN_WIDTH / 4;
var paddleHeight = paddleWitdh / 8;
var paddlePositionX = (SCREEN_WIDTH / 2) - (paddleWitdh / 2);
var paddlePositionY = SCREEN_HEIGHT - (paddleHeight * 1.5);
var paddleSpeed = 0;

// block values
var blockPadding = 1;
var blocksInRow = 6;
var blockRows = 4;
// (padding + block + padding) * blocksInRow = SCREEN_WIDTH
// padding + block + padding = SCREEN_WIDTH / blocksInRow
// block + (padding * 2) = (SCREEN_WIDTH / blocksInRow)
// block = (SCREEN_WIDTH / blocksInRow) - (padding * 2)
var blockWidth = SCREEN_WIDTH / blocksInRow;
var blockHeight = blockWidth / 8;
var blocks = [];

console.log(blocks);

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
        paddleSpeed = -10;
        break;
      case "KeyD":
      case "ArrowRight":
        paddleSpeed = 10;
        break;
    }
  });

  window.addEventListener("keyup", function(e) {
    paddleSpeed = 0;
  });

  window.setInterval(function() {
    detectCollision();
    updatePosition();
    drawScreen();
  }, 1000 / FPS);

});

function detectCollision() {

  var paddlePosition = {
    position: {
      x: paddlePositionX + paddleSpeed,
      y: paddlePositionY
    },
    width: paddleWitdh,
    height: paddleHeight
  };
  gameBall.screenCollision(SCREEN_WIDTH, SCREEN_HEIGHT);
  gameBall.checkCollision(paddlePosition);

  if (ballPositionX + ballSpeedX >= SCREEN_WIDTH || ballPositionX + ballSpeedX <= 0) {
    ballSpeedX *= -1
  }
  if (ballPositionY + ballSpeedY <= 0) {
    ballSpeedY *= -1
  }
  if (ballPositionY + ballSpeedY >= paddlePositionY) {
    // is ball touching paddle?
    if (ballPositionX + ballSpeedX > paddlePositionX && ballPositionX + ballSpeedX < paddlePositionX + paddleWitdh) {
      ballSpeedY *= -1
    }
  }
  if (ballPositionY + ballSpeedY > SCREEN_HEIGHT) {
    // lives -= 1;
    // reset();
    ballSpeedY *= -1
  }
  if (paddlePositionX + paddleWitdh + paddleSpeed >= SCREEN_WIDTH || paddlePositionX + paddleSpeed <= 0) {
    paddleSpeed = 0;
  }
}

function updatePosition() {
  // move the paddle
  paddlePositionX += paddleSpeed;
  // move the ball
  gameBall.move();
  // ballPositionX += ballSpeedX;
  // ballPositionY += ballSpeedY;
}

function drawScreen() {
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  // clear the screen
  drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "black", ctx);
  // draw some blocks
  for (var i = 0; i < blockRows; i++) {
    for (var j = 0; j < blocksInRow; j++) {
      var blockPositionX = j * (blockWidth + blockPadding) + blockPadding;
      var blockPositionY = i * (blockHeight + blockPadding) + blockPadding;
      drawRect(blockPositionX, blockPositionY, blockWidth, blockHeight, "white", ctx);
    }
  }
  // draw the paddle
  drawRect(paddlePositionX, paddlePositionY, paddleWitdh, paddleHeight, "white", ctx);
  // draw the ball
  drawCircle(gameBall.position.x, gameBall.position.y, gameBall.radius, "white", ctx);
}

function reset() {
  ballPositionX = (SCREEN_WIDTH / 2) - (ballRadius / 2);
  ballPositionY = (SCREEN_HEIGHT / 2) - (ballRadius / 2);
  ballSpeedX = 5;
  ballSpeedY = 5;
  paddlePositionX = (SCREEN_WIDTH / 2) - (paddleWitdh / 2);
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
