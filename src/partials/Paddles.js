import {SVG_NS} from "../settings.js";

export default class Paddles {
    constructor(boardHeight, width, height, x, y) {
      this.boardHeight = boardHeight;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.score = 0;
      this.speed = 10;

      document.addEventListener("keydown", event => {
        console.log(event);
      })
    }
    render(svg) {
      //...
        const paddles = document.createElementNS(SVG_NS, "rect");
        paddles.setAttributeNS(null, "width", this.width);
        paddles.setAttributeNS(null, "height", this.height);
        paddles.setAttributeNS(null, "x", this.x);
        paddles.setAttributeNS(null, "y", this.y);
        paddles.setAttributeNS(null, "fill", "white");
        svg.appendChild(paddles);
    }
  }