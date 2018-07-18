class Game {

    constructor(fieldSize, snakeSize, speed){
        this.size = fieldSize;
        this.score = snakeSize;
        this.speed = speed;
        this.action = '';
        this.snake = [];
    }

    initGame(){
        this.initScore();
        this.initField();
        this.initBorder();
        this.initSnake();
        this.initApple();
        this.initGameLogic();
    }

    initField(){
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

    initBorder(){
        let array = []
        for(let i = 1; i < this.size * this.size; i += this.size){
            array.push(i);
        }
        for(let i = 2; i < this.size; i++){
            array.push(i)
        }
        for(let i = 20; i < this.size * this.size; i += this.size){
            array.push(i)
        }
        for(let i = 382; i <= this.size * this.size; i ++){
            array.push(i)
        }
        array.forEach((item) =>{
            const cell = document.querySelector(`#cell${item}`);
            cell.classList.add('border');
        });
        this.border = array;
    }

    initScore(){
        const score = document.createElement('div');
        const container = document.querySelector('#root');
        score.classList.add('score');
        score.id = 'score';
        score.textContent = `Длина змейки: ${this.score}`;
        container.appendChild(score);
    }

    initApple(){
        let randomIndex = Math.floor(Math.random() * Math.pow(this.size, 2));
        for(let i = 0; i < document.getElementsByClassName('snake').length; i++){
            let snake = eval(document.getElementsByClassName('snake')[i].id.replace(/[^0-9]/g,''));
            this.border.forEach((item) => {
                if(randomIndex == item){
                    randomIndex = Math.floor(Math.random() * Math.pow(this.size, 2));
                }
            });
            if(randomIndex == snake){
                randomIndex = Math.floor(Math.random() * Math.pow(this.size, 2));
            }
        }
        const appleContainer = document.querySelector(`#cell${randomIndex}`);
        appleContainer.classList.add('apple');
        this.apple = randomIndex;
    }

    initSnake(){
        let currentSize = this.score;
        let randomIndex = Math.floor(Math.random() * Math.pow(this.size, 2));
        for(let i = 1; i <= this.size; i++){
            for(let j = 1; j < this.score; j++){
                this.border.forEach((item) => {
                    if(randomIndex + j == item){
                        randomIndex = Math.floor(Math.random() * Math.pow(this.size, 2));
                    }
                })
                if (randomIndex == this.size * i - j || randomIndex == i * this.size - 19) {
                    randomIndex = Math.floor(Math.random() * Math.pow(this.size, 2));
                }
            }
        }
        for(let i = 0; i < currentSize; i++){
            const snakeContainer = document.querySelector(`#cell${randomIndex + i}`);
            snakeContainer.classList.add('snake');
            this.snake.push(randomIndex + i);
        }
        this.snake.push(randomIndex + currentSize);
    }

    initGameLogic(){
        document.addEventListener("keydown", (event) => {
            if(event.keyCode === KEY_UP) {
                if(this.action != 'UP' && this.action != 'DOWN') this.motion(1, 'UP');
            }
            if(event.keyCode === KEY_RIGHT) {
                if(this.action != 'RIGHT' && this.action != 'LEFT') this.motion(-20, 'RIGHT');
            }
            if(event.keyCode === KEY_DOWN) {
                if(this.action != 'DOWN' && this.action != 'UP') this.motion(-1, 'DOWN');
            }
            if(event.keyCode === KEY_LEFT) {
                if(this.action != 'LEFT' && this.action != 'RIGHT') this.motion(20, 'LEFT');
            }
        });
        
    }

    motion(step, action){
        let stepToMove = step;
        this.action = `${action}`;
        let flux = setInterval(() =>{
        const newHead = document.getElementById(`cell${this.snake[0] - stepToMove}`);
        const pastTailId = this.snake[this.snake.length - 2];
        const pastHead = document.getElementById(`cell${this.snake[1] - stepToMove}`);
        const pastTail = document.getElementById(`cell${this.snake[this.snake.length - 2]}`);
        const ghostTail = document.getElementById(`cell${this.snake[this.snake.length - 1]}`);
        if(pastTailId == this.apple){
            pastTail.classList.remove('apple');
            ghostTail.classList.add('snake');
            this.snake.push(this.snake[0] - stepToMove);
            document.querySelector('#score').textContent =`Длина змейки: ${this.score}`;
            this.score++;
            this.initApple();
        }else{
            newHead.classList.add('snake');
            pastTail.classList.remove('snake');
            this.snake.unshift(this.snake[0] - stepToMove);
            this.snake.pop();
        }
        if(this.action != `${action}`){
            clearInterval(flux);
        }
        for(let i = 0; i < this.border.length; i++){
            if(this.snake[0] == this.border[i]){
                clearInterval(flux);
                alert('game over!');
            }
        }
        }, this.speed)
    }

}
const game = new Game(FIELD_SIZE, SNAKE_SIZE, SPEED);
game.initGame();