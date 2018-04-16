import {SVG_NS} from "../settings.js";

export default class Board {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    render(svg) {
      //...
        const board = document.createElementNS(SVG_NS, "rect");
        board.setAttributeNS(null, "x", 0);
        board.setAttributeNS(null, "y", 0);
        board.setAttributeNS(null, "width", this.width);
        board.setAttributeNS(null, "height", this.height);
        board.setAttributeNS(null, "fill", "#031927");

        const half = document.createElementNS(SVG_NS, "line");
        half.setAttributeNS(null, "stroke", "white");
        half.setAttributeNS(null, "stroke-width", 8);
        half.setAttributeNS(null, "stroke-dasharray", 5);
        half.setAttributeNS(null, "x1", 512);
        half.setAttributeNS(null, "y1", 0);
        half.setAttributeNS(null, "x2", 512);
        half.setAttributeNS(null, "y2", 512);

        svg.appendChild(board);
        svg.appendChild(half)
        
    }
  }