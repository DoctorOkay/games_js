// game screen constants
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const FPS = 30;

// player variables
var lives = 3;

// ball values
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
var blockPadding = 5;
var blocksInRow = 5;
var blockRows = 10;
var blockWidth = (SCREEN_WIDTH / blocksInRow);
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
    // check potential collision
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
    // move the paddle
    paddlePositionX += paddleSpeed;
    // move the ball
    ballPositionX += ballSpeedX;
    ballPositionY += ballSpeedY;
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
    drawCircle(ballPositionX, ballPositionY, ballRadius, "white", ctx);
  }, 1000 / FPS);

});

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
