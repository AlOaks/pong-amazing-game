import {SVG_NS} from "../settings.js";

export default class Ball {
  constructor(width, height, r) {
    this.width = width;
    this.height = height;
    this.r = r;
    this.padding = 0;
    this.score1 = 0;
    this.score2 = 0;
    this.direction = 1;
    this.ping = new Audio("../public/sounds/pong-03.wav");
    this.ping2 = new Audio("../public/sounds/pong-02.wav");
    this.goalSound = new Audio("../public/sounds/goal.wav");
    this.reset();
    // this.vx = this.direction * (6 - Math.abs(this.y));
    // this.vy = Math.floor(Math.random() * 10 - 5);
  }
  
  reset() {
    this.x = this.width / 2;
    this.y = this.height / 2;
    
    this.vy = 0;
    
    this.padding = 0;
    
    while(this.vy === 0) {
      this.vy = Math.floor(Math.random()* 10 - 5);
    }
    this.vx = 2*(this.direction * (6 - Math.abs(this.vy)));
    this.vy = 2 * this.vy;
  }
  
  
  movement() {
    this.x += this.vx;
    this.y += this.vy;
  }
  
  paddlebounce(paddle1, paddle2) {
    if(this.vx > 0) {
      // Check for paddle 2 collision
      let [leftX, rightX, topY, bottomY] = paddle2.coordinates();
      if((this.x + this.r + this.padding >= leftX) && 
      (this.x + this.r+ this.padding <= rightX) &&
      (this.y >= topY && this.y <= bottomY)) {
        this.ping.play();
        this.vx++;
        this.padding += .5;
        this.vx = this.vx * -1;
      }
    } else {
      // Check for paddle 1 collision
      let [leftX, rightX, topY, bottomY] = paddle1.coordinates();
      if((this.x - this.r - this.padding <= rightX) && 
      (this.x - this.r -this.padding>= leftX) &&
      (this.y >= topY && this.y <= bottomY)) {
        this.ping2.play();
        this.vx--;
        this.padding += .5;
        this.vx = this.vx * -1;
      }
    }
  }
  
  wallbounce(paddle1, paddle2) {
    const hitLeft = this.x - this.r <= 0;
    const hitRight = this.x + this.r >= this.width;
    const hitTop = this.y - this.r <= 0;
    const hitBottom = this.y + this.r >= this.height;

    if(hitLeft) {
      this.direction = -this.direction;
      this.goalSound.play();
      this.reset();
      paddle2.incrementScore();
    } else if (hitRight) {
      this.direction = -this.direction;
      this.goalSound.play();
      this.reset();
      paddle1.incrementScore();
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    } 
  }

  // fireshot() {
  //   if(keypress.pl1.shot) {
  //     if (player.getScore() >= 3 )
  //   } 
  // }  
  render(svg, paddle1, paddle2) {
    //...
    this.movement();
    // this.fireshot(paddle, paddle2);
    this.wallbounce(paddle1, paddle2);
    this.paddlebounce(paddle1, paddle2);
    const ball = document.createElementNS(SVG_NS, "circle");
    ball.setAttributeNS(null, "cx", this.x);
    ball.setAttributeNS(null, "cy", this.y);
    ball.setAttributeNS(null, "r", this.r);
    ball.setAttributeNS(null, "fill", "#BA1200");
    svg.appendChild(ball);
    
  }
}