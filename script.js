

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");

const box = 20;

let snake = [
    { x: 200, y: 200 }
];

let direction = "RIGHT";

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let score = 0;
let game;

// ovládání
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {

    const key = event.key;

    if (key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }
    else if (key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }
    else if (key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
    else if (key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
}

// kreslení hry
function drawGame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // jablka
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // had
    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = i === 0 ? "#085008" : "rgb(15,151,29)";

        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // pohyb
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Snězení jídla
    if (snakeX === food.x && snakeY === food.y) {

        score++;
        scoreText.textContent = score;

        do {

            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box
            };

        } while (
            food.x === snake[0].x &&
            food.y === snake[0].y
            );

    } else {

        snake.pop();
    }

    const newHead = {
        x: snakeX,
        y: snakeY
    };

    // kolize
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX > canvas.width - box ||
        snakeY > canvas.height - box ||
        collision(newHead, snake)
    ) {

        clearInterval(game);

        alert("Konec hry! Skóre: " + score);

        return;
    }

    snake.unshift(newHead);
}

// kolize hada
function collision(head, array) {

    for (let i = 1; i < array.length; i++) {

        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }

    return false;
}


//start
const startBtn =
    document.getElementById("startBtn");

if (startBtn) {

    startBtn.addEventListener("click", () => {

        try {

            if (!canvas) {

                throw "Canvas nebyl nalezen!";
            }

            clearInterval(game);

            game = setInterval(drawGame, 160);

        }

        catch (chyba) {

            alert("Chyba: " + chyba);
        }

        finally {

            console.log("Start tlačítko bylo použito.");
        }

    });

}




// restart
const restartBtn =
    document.getElementById("restartBtn");

if (restartBtn) {

    restartBtn.addEventListener("click", () => {

        try {

            if (!canvas) {

                throw "Herní plocha neexistuje!";
            }

            clearInterval(game);

            snake = [
                { x: 200, y: 200 }
            ];

            direction = "RIGHT";

            score = 0;

            scoreText.textContent = score;

            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box
            };

            game = setInterval(drawGame, 120);

        }

        catch (chyba) {

            alert("Chyba: " + chyba);
        }

        finally {

            console.log("Restart hry proběhl.");
        }

    });

}
