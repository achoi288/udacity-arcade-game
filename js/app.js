/*
 * @description The Character class has a method to render its image
 * @constructor
 * @param {number} x - The x-coordinate to start at
 * @param {number} y - The y-coordinate to start at
 * @param {number} row - The row to start at
 * @param {string} sprite - The path to the image file representing this Character
 */
class Character {

    constructor(x, y, row, sprite) {
        this.x = x;
        this.xStart = x;
        this.y = y;
        this.row = row;
        this.sprite = sprite;
    }

    /*
     * @description Draw the character on the screen
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/*
 * @description The Enemy class extends Character and has additional
 * methods to update its position, detect for collisions with the
 * Player and to check boundaries.
 * @constructor
 * @param {number} x - The x-coordinate to start at
 * @param {number} row - The row to start at
 * @param {number} speed - The speed the enemy travels at
 */
class Enemy extends Character {

    constructor(x, row, speed) {
        let y = 0;

        if (row === 1) {
            y = 60;
        } else if (row === 2) {
            y = 143;
        } else if (row === 3) {
            y = 226;
        }

        super(x, y, row, 'images/enemy-bug.png');

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
}

/*
 * @description The Player class extends Character and has additional
 * methods to handle left, up, right, down and spacebar key presses, 
 * reset to its starting position and change its sprite
 * @constructor
 */
class Player extends Character {

    constructor() {
        let sprites = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png'
        ]

        let spriteIndex = 0;

        super(200, 385, 5, sprites[spriteIndex]);

        this.yStart = this.y;

        this.sprites = sprites;
        this.spriteIndex = 0;
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
     * @description Handle user input for left, up, right, down and spacebar key presses
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
        } else if (key === 'spacebar') {
            this.changeSprite();
        }
    }

    /*
     * @description Change the Player sprite to the next in the array
     */
    changeSprite() {
        this.spriteIndex++;

        if (this.spriteIndex > (this.sprites.length - 1)) {
            this.spriteIndex = 0;
        }

        this.sprite = this.sprites[this.spriteIndex];
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
        40: 'down',
        32: 'spacebar'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});