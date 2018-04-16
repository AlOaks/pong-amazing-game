import {SVG_NS, KEYS} from "../settings.js";
import Board from "./Board.js";
import Ball from "./Ball.js";
import Paddles from "./Paddles.js";
import Score from "./Score.js";

export default class Game {

	constructor(element, width, height) {

		// VARIABLES
		this.element = element;
		this.width = width;
		this.height = height;
		this.paddleWidth = 16;
		this.paddleHeight = 112;
		this.pause = false;
		this.start = false;
		this.gameEnd = false;
		this.paddle1resized = false;
		this.paddle2resized = false;
		this.winner = new Audio("../public/sounds/winner.wav");
		this.pauseSound = new Audio("../public/sounds/pause.wav");
		this.startSound = new Audio("../public/sounds/start.wav");
		this.winnerText = "";
		this.challenges = ["Drink a shot", "Do your sexiest moan!", "Show Underwear", "Kiss The Winner", "Get Spanked", "Truth or Dare?", "Drink A Whole Beer/ Glass", "Body Shot!!", "Twerk to the Winner!", "You're the Slave!"];
		this.index = Math.floor(Math.random() * 10);

		// INSTANCES
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);
		this.ball = new Ball(this.width, this.height, 16);
		this.ball2 = new Ball(this.width, this.height, 16);
		this.ball3 = new Ball(this.width, this.height, 16);
		this.score1 = new Score(this.width / 2 - 100, 60, 60);
		this.score2 = new Score(this.width / 2 + 50, 60, 60);
		this.pauseText = new Score((this.width / 2) - 140, this.height / 2, 80);
		this.winnerText2 = new Score((this.width / 2) - 250, this.height / 2, 80);
		this.loserText = new Score((this.width / 2) - 300, this.height / 2 + 100, 50, "white");
		this.refresh = new Score((this.width / 2) - 350, this.height / 2 + 200, 50, "black");
		this.paddle1 = new Paddles(this.height, this.paddleWidth, this.paddleHeight, 20, 204, KEYS.a, KEYS.z, "#9DD1F1");
		this.paddle2 = new Paddles(this.height, this.paddleWidth, this.paddleHeight, 992, 204, KEYS.up, KEYS.down, "#9DD1F1");
		
		//EVENTS

		document.addEventListener("keydown", event => {
			if(event.keyCode == KEYS.spaceBar) {
				this.pause = !this.pause;	
				if (this.pause === true) {
					this.pauseSound.play();
				}
			}
		});

		document.addEventListener("keydown", event => {
			if(event.keyCode == KEYS.enter) {
				this.start = true;
				document.getElementById("start").remove();
				this.startSound.play();
			}
		});
	}

	
	render() {
		// More code goes here...

		// GAME START
		if(this.start === false) {
			return;
		} 

		// PAUSE

		// RENDER
		this.gameElement.innerHTML = "";
		let svg = document.createElementNS(SVG_NS, "svg");
		svg.setAttributeNS(null, "width", this.width);
		svg.setAttributeNS(null, "height", this.height);
		svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);
		this.board.render(svg);
		this.paddle1.render(svg);
		this.paddle2.render(svg);
		
		// WINNER
		
		if (this.paddle1.getScore() === 15 && this.gameEnd === false) {
			this.winnerText = "Winner P1";
			this.gameEnd = true;
			this.winner.play();
		} else if (this.paddle2.getScore() == 15 && this.gameEnd === false) {
			this.winnerText = "Winner P2";
			this.gameEnd = true;
			this.winner.play();
		} else {
			this.score1.render(svg, this.paddle1.getScore());
			this.score2.render(svg, this.paddle2.getScore());
		}
		
		if(this.gameEnd === true) {
			this.winnerText2.render(svg, this.winnerText);
			this.loserText.render(svg, "LOSER: " + this.challenges[this.index] );
			this.refresh.render(svg, "TO PLAY AGAIN PRESS F5");
			return;
		}
		if (this.pause) {	
			this.pauseText.render(svg, "PAUSE");
			return;
		}


		this.ball.render(svg, this.paddle1, this.paddle2);

		// RESIZING
		if(this.paddle1.getScore() === 10 && this.paddle1resized === false) {
			this.paddle1.resize();
			this.paddle1resized = true;
		}

		if(this.paddle2.getScore() === 10 && this.paddle2resized === false) {
			this.paddle2.resize();
			this.paddle2resized= true;
		}

	

		// EXTRA BALL
		if(this.paddle1.getScore() >= 5 || this.paddle2.getScore() >= 5) {
			this.ball2.render(svg, this.paddle1, this.paddle2);
		}

		if(this.paddle1.getScore() >= 10 || this.paddle2.getScore() >= 10) {
			this.ball3.render(svg, this.paddle1, this.paddle2);
		}

	}

}
