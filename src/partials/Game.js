import {SVG_NS} from "../settings.js";
import KEYS from "../settings.js"
import Board from "./Board.js";
import Ball from "./Ball.js";
import Paddles from "./Paddles.js";

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.paddleWidth = 8;
		this.paddleHeight = 56;
	
		// Other code goes here...
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);
		this.ball = new Ball(256, 125, 8);
		this.paddle1 = new Paddles(this.height, this.paddleWidth, this.paddleHeight, 10, 102);
		this.paddle2 = new Paddles(this.height, this.paddleWidth, this.paddleHeight, 496, 102);
	}

	render() {
		// More code goes here...
		this.gameElement.innerHTML = "";
		let svg = document.createElementNS(SVG_NS, "svg");
		svg.setAttributeNS(null, "width", this.width);
		svg.setAttributeNS(null, "height", this.height);
		svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.ball.render(svg);
		this.paddle1.render(svg);
		this.paddle2.render(svg);

	}

}
