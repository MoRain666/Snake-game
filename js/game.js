class Game {

    constructor(fieldSize, snakeSize, speed, border) {
        this.size = fieldSize;
        this.score = snakeSize;
        this.speed = speed;
        this.action = '';
        this.snake = [];
        this.border = border;
    }

    initGame() {
        this.initScore();
        this.initField();
        this.initBorder();
        this.initSnake();
        this.initApple();
        this.initGameLogic();
    }

    initField() {
        const containerForCells = document.querySelector('#root');
        for (let row = 0; row < this.size; row++) {
            const rowCell = document.createElement("div");
            rowCell.id = `col${row + 1}`;
            containerForCells.appendChild(rowCell);
            for (let col = 0; col < this.size; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.id = `cell${row * this.size + col + 1}`;
                rowCell.appendChild(cell);
            }
        }
    }

    initBorder() {
        this.border.forEach((item) => {
            const cell = document.querySelector(`#cell${item}`);
            cell.classList.add('border');
        });
    }

    initScore() {
        const score = document.createElement('div');
        const container = document.querySelector('#root');
        score.classList.add('score');
        score.id = 'score';
        score.textContent = `Length of snake: ${this.score}`;
        container.appendChild(score);
    }

    initApple() {
        let randomIndex = Math.floor(Math.random() * Math.pow(this.size, 2));
        for (let i = 0; i < document.getElementsByClassName('snake').length; i++) {
            let snake = eval(document.getElementsByClassName('snake')[i].id.replace(/[^0-9]/g, ''));
            this.border.forEach((item) => {
                if (randomIndex == item) {
                    randomIndex = Math.floor(Math.random() * Math.pow(this.size, 2));
                }
            });
            if (randomIndex == snake) {
                randomIndex = Math.floor(Math.random() * Math.pow(this.size, 2));
            }
        };
        const appleContainer = document.querySelector(`#cell${randomIndex}`);
        appleContainer.classList.add('apple');
        this.apple = randomIndex;
    }

    initSnake() {
        let currentSize = this.score;
        let randomIndex = Math.floor(Math.random() * Math.pow(this.size, 2));
        for (let i = 1; i <= this.size; i++) {
            for (let j = 1; j < this.score; j++) {
                this.border.forEach((item) => {
                    if (randomIndex + j == item) {
                        randomIndex = Math.floor(Math.random() * Math.pow(this.size, 2));
                    }
                });
                if (randomIndex == this.size * i - j || randomIndex == i * this.size - 19) {
                    randomIndex = Math.floor(Math.random() * Math.pow(this.size, 2));
                }
            }
        }
        for (let i = 0; i < currentSize; i++) {
            const snakeContainer = document.querySelector(`#cell${randomIndex + i}`);
            snakeContainer.classList.add('snake');
            this.snake.push(randomIndex + i);
        }
        this.snake.push(randomIndex + currentSize);
    }


    motion(step, action) {
        let stepToMove = step;
        this.action = `${action}`;
        let flux = setInterval(() => {
            const newHead = document.getElementById(`cell${this.snake[0] - stepToMove}`);
            const Head = document.getElementById(`cell${this.snake[0]}`);
            const pastTail = document.getElementById(`cell${this.snake[this.snake.length - 2]}`);
            if (this.snake[0] == this.apple) {
                Head.classList.remove('apple');
                pastTail.classList.add('snake');
                this.score++;
                this.snake.push(this.snake[0] - stepToMove);
                document.querySelector('#score').textContent = `Length of snake: ${this.score}`;
                this.initApple();
                newHead.classList.add('snake');
                pastTail.classList.remove('snake');
                this.snake.unshift(this.snake[0] - stepToMove);
                this.snake.pop();
            } else {
                for (let i = 1; i < this.snake.length; i++) {
                    if (this.snake[0] == this.snake[i]) {
                        this.endOfGame();
                        clearInterval(flux);
                    }
                }
                newHead.classList.add('snake');
                pastTail.classList.remove('snake');
                this.snake.unshift(this.snake[0] - stepToMove);
                this.snake.pop();
            }
            if (this.action != `${action}`) {
                clearInterval(flux);
            }
            for (let i = 0; i < this.border.length; i++) {
                if (this.snake[0] == this.border[i]) {
                    clearInterval(flux);
                    this.endOfGame();
                }
            }
        }, this.speed)
    }


    initGameLogic() {
        this.motion(1, 'UP');
        let handler = (event) => {
            switch (event.keyCode) {
                case KEY_UP:
                    if (this.action != 'UP' && this.action != 'DOWN') this.motion(1, 'UP');
                    break;
                case KEY_RIGHT:
                    if (this.action != 'RIGHT' && this.action != 'LEFT') this.motion(-20, 'RIGHT');
                    break;
                case KEY_DOWN:
                    if (this.action != 'DOWN' && this.action != 'UP') this.motion(-1, 'DOWN');
                    break;
                case KEY_LEFT:
                    if (this.action != 'LEFT' && this.action != 'RIGHT') this.motion(20, 'LEFT');
                    break;
            }
        }
        this.handler = handler;
        document.addEventListener("keydown", handler);
    }


    endOfGame() {
        const rootContainer = document.querySelector('#root');
        const newContainer = document.createElement('div');
        const replay = document.createElement('button');
        const score = document.createElement('div');
        newContainer.classList.add('modal-dialog');
        document.removeEventListener('keydown', this.handler);
        rootContainer.remove();
        replay.textContent = 'Play again';
        replay.addEventListener('click', () => location.reload());
        score.textContent = `You lose! Current score: ${this.score}`;
        document.body.appendChild(newContainer);
        newContainer.appendChild(score);
        newContainer.appendChild(replay);
    }

}
const game = new Game(FIELD_SIZE, SNAKE_SIZE, SPEED, BORDER_ARRAY);
game.initGame();