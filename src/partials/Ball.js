import {SVG_NS} from "../settings.js";

export default class Ball {
    constructor(x, y, r) {
      this.x = x,
      this.y = y,
      this.r = r
    }
    render(svg) {
      //...
        const ball = document.createElementNS(SVG_NS, "circle");
        ball.setAttributeNS(null, "cx", this.x);
        ball.setAttributeNS(null, "cy", this.y);
        ball.setAttributeNS(null, "r", this.r);
        ball.setAttributeNS(null, "fill", "white");
        svg.appendChild(ball);
        
    }
  }