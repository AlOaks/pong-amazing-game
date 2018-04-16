import {SVG_NS} from "../settings.js";

export default class Paddles {
    constructor(boardHeight, width, height, x, y, up, down, color) {
      this.boardHeight = boardHeight;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.shrinksound = new Audio("../public/sounds/laser.mp3")
      this.color = color;
      this.score = 0;
      this.speed = 60;

        document.addEventListener("keydown", event => {
          switch (event.keyCode) {
            case up:
              this.up();             
              break;
            case down:
              this.down();
              break;
              default:
          }
        });
    }

    resize() {
      this.height = this.height * .75;
      this.color = "#32213A";
      this.shrinksound.play();

    }
    
    incrementScore() {
      this.score++;
    }
    
    getScore() {
      return this.score;
    }

    coordinates() {
      let left = this.x;
      let right = this.x + this.width;
      let top = this.y;
      let bottom = this.y + this.height;
      return [left, right, top, bottom];
    }
  
    up() {
      this.y = Math.max(0, this.y - this.speed);
    }

    down() {
      this.y = Math.min(521 - 112, this.y + this.speed)
    }

    render(svg) {
      //...
        const paddles = document.createElementNS(SVG_NS, "rect");
        paddles.setAttributeNS(null, "width", this.width);
        paddles.setAttributeNS(null, "height", this.height);
        paddles.setAttributeNS(null, "x", this.x);
        paddles.setAttributeNS(null, "y", this.y);
        paddles.setAttributeNS(null, "fill", this.color);
        svg.appendChild(paddles);
    }
  }