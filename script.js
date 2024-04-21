let snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 }
]


// Users score
let score = 0;
// Horizotal Velocity
let dx = 0;
// Vertical Velocity
let dy = -10;
// when set to true the snake is changing direction
let changingDirection = false;


// Get the canvas element
const canvas = document.getElementById("gameCanvas");
// Returning the two dimentinal drawing context
const ctx = canvas.getContext("2d");


// Create the first food location
createFood();
//Start Game
main();

// Call change direction whenever a key is pressed
document.addEventListener("keydown", changeDirection);


/*
    Main function of the game 
    called repeateadly to advance the games
*/
function main() {
    // if the game ended return early to stop game
    if(didGameEnd()) return; 
    
    setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();

        // Call game again
        main();
    }, 100);
}


/*
    Change the background color to the canvas and
    draw a border around it.
*/
function clearCanvas() {
    
    // Select a color to fill the drawing
    ctx.fillStyle = "white";
    // Selecting color for the border of the canvas
    ctx.strokeStyle = "black";
    // Drawing a fixed rectangle to cover the entire canvas
    ctx.fillRect(0, 0, canvas.width - 2, canvas.height - 2);
    // Drawing a border arounf the entire canvas
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

}


/* 
    fuction to draw food on the canvas
*/
function drawFood(){
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}


/* 
    Advance the snake by changing the x-coordinstes of its parts
    according to the horizontal velocity and the y coordinates of its parts
    according to the vertical velocity
*/
function advanceSnake() {
    // Create a new snake head
    const head = { x: snake[0].x + dx, y: snake[0].y + dy};
    // Now add the new head to the beginning of the snake's body
    snake.unshift(head);

    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood){

        // increase score
        score += 10;
        // display score on screen
        document.getElementById('score').innerHTML = score;

        // generate new food location
        createFood();
    }else{
        // remove the last part of the snake body
        snake.pop();
    }
}


/*
    Ending the game
    returns ture if the head of the snake touched another part of the game 
    or any of the walls
*/
function didGameEnd(){
    for(let i=4;i<snake.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >gameCanvas.width-10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height-10;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}


/*
    Genrating food for our snake
    Generating a random number that is a multiple of 10
    given a minimum and maximum
    @param { number } min - The minimum number the random number can be
    @param { number } max - The maximum number the random number can be
*/
function randomTen(min, max){
    return Math.round((Math.random() * (max-min) + min)/ 10) * 10;
}


/*
    create random set of coordinates for the food
*/
function createFood(){
    // Generate a random number for the food x coordinate
    foodX = randomTen(0, gameCanvas.width - 10);
    // Generate a random number for the food y coordinate
    foodY = randomTen(0, gameCanvas.height - 10);

    // if the new food location is where snake currently is, generate a new food location 
    snake.forEach(function IsFoodOnSnake(part){
        const foodIsOnSnake = part.x == foodX && part.y == foodY; 
        if(foodIsOnSnake) createFood();
    });
}


/*
    Drawing the Snake on the canvas
*/
function drawSnake() {
    // loop through the each parts drawing each part on the canvas
    snake.forEach(drawSnakePart);
}


/*
    Draws a part of snake on the canvas
    @param {object} snakePart - The coordinates where the part should be drawn
*/
function drawSnakePart(snakePart) {
    // Set the color of the snske port
    ctx.fillStyle = "lightgreen";

    // Ser the border color of the snake board
    ctx.strokeStyle = "darkgreen";

    // Draw a "filled" rctangle to represent the snake port at the coordinates
    // the part us located
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    // Draw the border around the snake port
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}


/*
    Function to chsnge direction of the snake
*/
function changeDirection(event) {
    
    // CHange the vertical and horizontal velocity of snake 
    // acc to the key pressed
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    // prevent the snake from reversing
    // @param { object } event - The keydown event
    if (changingDirection) return;
    changingDirection = true;


    const keyPressed = event.keyCode;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    /*
        we also check if the snake is moving it the opposit 
        direction of inteded direction -> to prevent our snake from 
        reversing
    */

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}



