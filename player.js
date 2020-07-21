class Player {
  constructor() {
    this.size = createVector(width / 70, height * difficultyPaddle);
    this.pos = createVector(width / 30, height / 2 - this.size.y/2);
    this.playerMovement = 0;
    this.vel = createVector(0, 0);
    this.score = 0;
  }

  show() {
    fill(255);
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }

  update() {
    this.pos.y = mouseY - this.size.y / 2;
    if (this.pos.y < 0) {
      this.pos.y = 0;
    } else if (this.pos.y + this.size.y > height) {
      this.pos.y = height - this.size.y;
    }
    this.playerMovement = pmouseY - mouseY;
  }
}