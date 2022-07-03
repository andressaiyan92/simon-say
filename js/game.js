/*
    Author: Sevillano Molina Andrés.
*/

let round = document.getElementById("round");
let simonButtons = document.getElementsByClassName("square");
let startButton = document.getElementById("startButton");

class simon {
    constructor(simonButtons, startButton, round) {
        this.round = 0;
        this.userPosition = 0;
        this.totalRounds = 10;
        this.sequence = [];
        this.speed = 1000;
        this.blockedButtons = true;
        this.buttons = Array.from(simonButtons);
        this.display = {
            startButton,
            round,
        }
        this.startSound = new Audio("./resources/sounds/start.wav");
        this.errorSound = new Audio("./resources/sounds/error.wav");
        this.winSound = new Audio("./resources/sounds/win.wav");
        this.buttonsSound = [
            new Audio("./resources/sounds/1.wav"),
            new Audio("./resources/sounds/2.wav"),
            new Audio("./resources/sounds/3.wav"),
            new Audio("./resources/sounds/4.wav"),
        ];
    }

    init() {
        this.display.startButton.onclick = () => this.startGame();
    }

    startGame() {
        this.startSound.play();
        this.display.startButton.disabled = true;
        this.updateRound(0);
        this.userPosition = 0;
        this.sequence = this.createSequence();
        this.buttons.forEach((element, i) => {
            element.classList.remove("winner");
            element.onclick = () => this.buttonClick(i);
        });
        this.showSequence();
    }

    updateRound(value) {
        this.round = value;
        this.display.round.textContent = `Round: ${this.round}`;
    }

    createSequence() {
        return Array.from({ length: this.totalRounds }, () => this.getRandomColor());
    }

    getRandomColor() {
        return Math.floor(Math.random() * 4);
    }

    buttonClick(value) {
        !this.blockedButtons && this.validateChosenColor(value);
    }

    validateChosenColor(value) {
        if (this.sequence[this.userPosition] === value) {
            this.buttonsSound[value].play();
            if (this.round === this.userPosition) {
                this.updateRound(this.round + 1);
                this.speed /= 1.02;
                this.isGameOver();
            } else {
                this.userPosition++;
            }
        } else {
            this.gameLost();
        }
    }

    isGameOver() {
        if (this.round === this.totalRounds) {
            this.gameWon();
        } else {
            this.userPosition = 0;
            this.showSequence();
        }
    }

    showSequence() {
        this.blockedButtons = true;
        let sequenceIndex = 0;
        let timer = setInterval(() => {
            const button = this.buttons[this.sequence[sequenceIndex]];
            this.buttonsSound[this.sequence[sequenceIndex]].play();
            this.toggleButtonStyle(button);
            setTimeout(() => this.toggleButtonStyle(button), this.speed / 2);
            sequenceIndex++;
            if (sequenceIndex > this.round) {
                this.blockedButtons = false;
                clearInterval(timer);
            }
        }, this.speed);
    }

    toggleButtonStyle(button) {
        button.classList.toggle("active");
    }

    gameLost() {
        this.errorSound.play();
        this.display.startButton.disabled = false;
        this.blockedButtons = true;
        this.updateRound("Intentalo nuevamente 😨");
    }

    gameWon() {
        this.updateRound("Felicidades haz ganado 🎉");
        this.display.startButton.disabled = false;
        this.blockedButtons = true;
        this.winSound.play();
        this.buttons.forEach((element) => element.classList.add("winner"));

    }

}

let simonGame = new simon(simonButtons, startButton, round);
simonGame.init();