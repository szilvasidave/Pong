class AIPlayer {
  constructor() {
    this.size = createVector(width / 70, height * difficultyPaddle);
    this.pos = createVector(width / 30 * 29, height / 2 - this.size.y / 2);
    this.ppos = createVector(0, 0);
    this.playerMovement = 0;
    this.vel = createVector(0, 0);
    this.movementDestination = createVector(0, 0);
    this.score = 0;
  }

  show() {
    fill(255);
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }

  update() {
    this.ppos = this.pos.copy();

    this.movementDestination = this.calculatePreferredPosition();
    let movementDistance = this.pos.y - (this.movementDestination.y);
    if (this.pos.y != this.movementDestination.y) {
      this.pos.y -= movementDistance/20;
    }

    if (this.pos.y < 0) {
      this.pos.y = 0;
    } else if (this.pos.y + this.size.y > height) {
      this.pos.y = height - this.size.y;
    }
    this.playerMovement = this.ppos.y - this.pos.y;
  }

  calculatePreferredPosition() {
    if (ball.vel.x > 0) {
      let Line2Point1;
      let Line2Point2;
      
      let intersectPointWithTopOrBottom = createVector(-1, -1);
      let intersectPointWithPlayer = createVector(0, 0);
      let Line1Point1 = createVector(ball.pos.x, ball.pos.y);
      let Line1Point2 = createVector(ball.pos.x + ball.vel.x, ball.pos.y + ball.vel.y);

      while (intersectPointWithPlayer.x == 0 && intersectPointWithPlayer.y == 0) {

        if (Line1Point2.y < Line1Point1.y) {
          Line2Point1 = createVector(0, 0);
          Line2Point2 = createVector(width, 0);
        } else {
          Line2Point1 = createVector(0, height);
          Line2Point2 = createVector(width, height);
        }
        intersectPointWithTopOrBottom = this.findIntersect(Line1Point1, Line1Point2, Line2Point1, Line2Point2);
        
        if (intersectPointWithTopOrBottom.x >= this.pos.x) {
          Line2Point1 = this.pos;
          Line2Point2 = createVector(this.pos.x, this.pos.x + this.size.y);

          intersectPointWithPlayer = this.findIntersect(Line1Point1, Line1Point2, Line2Point1, Line2Point2);
        } else {

          
          //mirror points to the intersection point and swap their numbers to swap direction to set correct new intersection line in next iteration
          let tmp1 = Line1Point1.copy();
          Line1Point1 = createVector(Line1Point2.x + ((intersectPointWithTopOrBottom.x - Line1Point2.x) * 2), Line1Point2.y);
          Line1Point2 = createVector(tmp1.x + ((intersectPointWithTopOrBottom.x - tmp1.x) * 2), tmp1.y);
        }
      }
      
      //For debugging
      //fill(120);
      //rect(intersectPointWithPlayer.x, intersectPointWithPlayer.y - this.size.y / 2, this.size.x, this.size.y);

      return createVector(intersectPointWithPlayer.x,intersectPointWithPlayer.y-(this.size.y/2));
    }
    return this.pos;
  }

  findIntersect(p1, p2, p3, p4) {
    //https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Intersection_of_two_lines
    let numX = ((p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x) - ((p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x)));
    let numY = (((p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y)) - ((p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x)));
    let denom = ((p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x));

    if (denom == 0) {
      denom = 0.1;
      console.log('Denominator was 0 while calculating AI position');
    }

    let Px = numX / denom;
    let Py = numY / denom;
    return createVector(Px, Py);
  }


}