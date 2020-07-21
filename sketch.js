let difficultyPaddle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  difficultyPaddle = 0.25;

  player1 = new Player();
  player2 = new AIPlayer();
}

function draw() {
  background(0);

  fill(255);
  textSize(width * height / 20000);
  textAlign(LEFT);
  text(player1.score, player1.pos.x, height / 13);
  textAlign(RIGHT);
  text(player2.score, player2.pos.x, height / 13);


  if (typeof ball === 'undefined') {
    newRound();
  }
  player1.show();
  player1.update();

  ball.show();
  ball.update();

  player2.show();
  player2.update();

  ball.offScreen();
  ball.hits(player1);
  ball.hits(player2);

  if (ball.offScreenLocation != 0) {
    if (ball.offScreenLocation == 1) {
      player2.score += 1;
    } else if (ball.offScreenLocation == 2) {
      player1.score += 1;
    }
    delete ball;
  }



}

function newRound() {
  ball = new Ball();

  fill(255);
  textSize(width * height / 30000);
  textAlign(CENTER, CENTER);
  text('Pong\n\nPress Space to start round', width / 2, height / 2);
  noLoop();
}

function keyPressed() {
  if (keyCode === ENTER || keyCode === 32) {
    loop();
  }
}
  
function touchEnded() {
  loop();
}
