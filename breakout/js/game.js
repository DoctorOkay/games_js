// game screen constants
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const FPS = 30;

// ball values
var ballRadius = 10;
var ballPositionX = (SCREEN_WIDTH / 2) - (ballRadius / 2);
var ballPositionY = (SCREEN_HEIGHT / 2) - (ballRadius / 2);
var ballSpeedX = 5;
var ballSpeedY = 5;

// paddle values

// block values

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
    ballPositionX = (SCREEN_WIDTH / 2) - (ballRadius / 2);
    ballPositionY = (SCREEN_HEIGHT / 2) - (ballRadius / 2);
    ballSpeedX *= -1;
  });

  window.setInterval(function() {
    // check potential collision
    if (ballPositionX + ballSpeedX >= SCREEN_WIDTH || ballPositionX + ballSpeedX <= 0) {
      ballSpeedX *= -1
    }
    if (ballPositionY + ballSpeedY >= SCREEN_HEIGHT || ballPositionY + ballSpeedY <= 0) {
      ballSpeedY *= -1
    }
    // move the ball
    ballPositionX += ballSpeedX;
    ballPositionY += ballSpeedY;
    // clear the screen
    drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "black", ctx);
    // draw the ball
    drawCircle(ballPositionX, ballPositionY, ballRadius, "white", ctx);
  }, 1000 / FPS);

});


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
