class Ball {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.r = (width * height) / 80000;
    this.offScreenLocation = 0;
    this.vel = createVector(0, 0);
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  update() {
    if (this.vel.x == 0 || this.vel.y == 0) {
      this.vel.set(random(-1, 1), random(-1, 1));
      //this.vel.set(-1,2);
      this.vel.setMag(10);
    } else if (this.vel.x < 4 && this.vel.x > -4) {
      this.vel.x = this.vel.x * 2;
    }
    this.vel.limit(35);
    this.pos.add(this.vel);
  }

  hits(player) {
    if (this.pos.x - this.r <= player.pos.x + player.size.x &&
      this.pos.y - this.r <= player.pos.y + player.size.y &&
      this.pos.x + this.r >= player.pos.x &&
      this.pos.y + this.r >= player.pos.y) {

      let n = createVector(-1, 0);
      this.vel.reflect(n);
      this.vel.setMag(this.vel.mag() + abs((player.playerMovement * 0.2)));

      let currHead = this.vel.heading();
      this.vel.rotate(radians(currHead * 0.1));
    }
  }

  offScreen() {
    //if ball goes offscreen on Player1 side give Player2 a point
    if (this.pos.x + this.r < 0) {
      this.offScreenLocation = 1;
      //Else if ball goes offscreen on Player2 side give Player1 a point
    } else if (this.pos.x - this.r > width) {
      this.offScreenLocation = 2;
      //Else if ball hits bottom, reflect back
    } else if (this.pos.y + this.r > height) {
      this.vel.reflect(createVector(0, -1));
      return;
      //Else if ball hits top, reflect back
    } else if (this.pos.y - this.r <= 0) {
      this.vel.reflect(createVector(0, 1));
      return;
    }
  }

}