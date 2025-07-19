// Constants
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const MusicSound = new Audio('music/music.mp3');


let direction = { x: 0, y: 0 };
let inputDir = { x: 0, y: 0 };
let speed = 6;
let lastPaintTime = 0;
let score = 0;
let flag = false;

let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 2, y: 3 };

const board = document.getElementById('board');
const scoreBox = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');

let highScoreVal = 0;
let savedHighScore = localStorage.getItem("highScore");

if (savedHighScore === null) {
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
} else {
    highScoreVal = JSON.parse(savedHighScore);
    highScoreDisplay.innerHTML = "High Score: " + highScoreVal;
}

// Main game loop
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
    lastPaintTime = ctime;
    gameEngine();
}

// Check for collision
function isCollide(snake) {
    // Collide with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true;
    }
    // Collide with wall
    if (snake[0].x < 0 || snake[0].x > 18 || snake[0].y < 0 || snake[0].y > 18) return true;

    return false;
}

// Generate random food not on snake
function getRandomFoodPosition() {
    let newFood;
    while (true) {
        newFood = {
            x: Math.floor(2 + Math.random() * 15),
            y: Math.floor(2 + Math.random() * 15)
        };
        if (!snakeArr.some(segment => segment.x === newFood.x && segment.y === newFood.y)) break;
    }
    return newFood;
}

// Game engine
function gameEngine() {
    if (flag || isCollide(snakeArr)) {
        gameOverSound.play();
        MusicSound.pause();
        alert("Game Over. Press any key to play again!");
        inputDir = { x: 0, y: 0 };
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        speed=6;
        flag = false;
        scoreBox.innerHTML = "Score: " + score;
        if(musicBtn.innerText === '🔇 Music'){
            MusicSound.play();
        }
    }

    // Food eaten
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score++;
        if(score%5==0){
            speed+=0.5;
        }
        if (score > highScoreVal) {
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highScoreDisplay.innerHTML = "High Score: " + highScoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        food = getRandomFoodPosition();
    }

    // Move the snake
    if (
        snakeArr[0].x + inputDir.x < 0 || snakeArr[0].x + inputDir.x > 18 ||
        snakeArr[0].y + inputDir.y < 0 || snakeArr[0].y + inputDir.y > 18
    ) {
        flag = true;
    } else {
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
    }

    // Draw snake and food
    board.innerHTML = '';
    let snakeElement, foodElement;

    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add(index === 0 ? 'head' : 'snake');
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Start game
MusicSound.play();
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y !== 1) inputDir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (inputDir.y !== -1) inputDir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (inputDir.x !== 1) inputDir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (inputDir.x !== -1) inputDir = { x: 1, y: 0 };
            break;
    }
});

let musicPlaying = true;
musicBtn.addEventListener('click', () => {
    musicPlaying = !musicPlaying;
    if (musicPlaying) {
        MusicSound.play();
        musicBtn.innerText = '🔇 Music';
    } else {
        MusicSound.pause();
        musicBtn.innerText = '🔊 Music';
    }
});
