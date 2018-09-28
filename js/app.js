class Enemy {

    constructor(x, row, speed) {
        this.xStart = x;
        this.x = x;
        this.row = row;

        if (row === 1) {
            this.y = 60;
        } else if (row === 2) {
            this.y = 143;
        } else if (row === 3) {
            this.y = 226;
        }

        this.speed = speed;
    }

    /*
     * @description Update the enemy's position, required method for game
     * @param {number} dt - A time delta between ticks
     */
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        this.detectCollision();
        this.checkBoundary();
    }

    /*
     * @description Check if the Enemy has collided with the Player
     */
    detectCollision() {
        if (this.x < (player.x + 75) &&
            this.x > (player.x - 75) &&
            this.row === player.row)
            player.resetPosition();
    }

    /*
     * @description Check if the Enemy has reached the right-edge of the
     * game board and reset them to their starting x position to loop
     * them across the screen
     */
    checkBoundary() {
        if (this.x > 505)
            this.x = this.xStart;
    }

    /*
     * @description Draw the character on the screen
     */
    render() {
        ctx.drawImage(Resources.get('images/enemy-bug.png'), this.x, this.y);
    }
}

class Player {

    constructor() {
        this.xStart = 200;
        this.yStart = 385;
        this.x = this.xStart;
        this.y = this.yStart;
        this.row = 5;
    }

    /*
     * @description Draw the character on the screen
     */
    render() {
        ctx.drawImage(Resources.get('images/char-boy.png'), this.x, this.y);
    }

    /*
     * @description Reset to the players starting position
     */
    resetPosition() {
        this.x = this.xStart;
        this.y = this.yStart;
        this.row = 5;
    }

    /*
     * @description Handle user input for left, up, right, down key presses
     * @param {number} key - The input key to handle
     */
    handleInput(key) {
        if (key === 'left') {
            if (this.x - 101 >= -2)
                this.x -= 101;
        } else if (key === 'up') {
            if (this.y - 83 >= -30) {
                this.y -= 83;
                this.row -= 1;

                if (this.y === -30)
                    this.resetPosition();
            }
        } else if (key === 'right') {
            if (this.x + 101 <= 402)
                this.x += 101;
        } else if (key === 'down') {
            if (this.y + 83 <= 385) {
                this.y += 83;
                this.row += 1;
            }
        }
    }
}

let player = new Player();

let enemy1 = new Enemy(-100, 1, 10),
    enemy2 = new Enemy(-100, 2, 70),
    enemy3 = new Enemy(-180, 2, 200),
    enemy4 = new Enemy(-100, 3, 150),
    enemy5 = new Enemy(-200, 1, 400),
    enemy6 = new Enemy(-150, 1, 250);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Listen for key presses and send the keys to Player.handleInput() method
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});