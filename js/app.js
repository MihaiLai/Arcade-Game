// Enemies our player must avoid
var enemyY = [60, 140, 230];
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -101 * (Math.random() * 10 + 5);
    this.y = enemyY[Math.round(Math.random() * 2)];
    this.speed = 0;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 0) {
        this.speed = Math.random() * 550 + 100;
    }
    this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //when the enemy is outside the canva
    //reset it's position in random.
    if (this.x > 505) {
        this.x = -101 * (Math.random() * 10);
        this.y = enemyY[Math.round(Math.random() * 2)];
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//if the charactor touch bugs, gamer over and charactor will be reset
Enemy.prototype.checkCollisions = function() {
    var playerWidth = 69;
    var playerHeight = 77;
    var enemyWidth = 101;
    var enemyHeight = 67;
    var playerX = player.x + 15;
    var playerY = player.y + 62;
    var enemyX = this.x;
    var enemyY = this.y + 75;
    if (playerX < enemyX + enemyWidth &&
        playerX + playerWidth > enemyX &&
        playerY < enemyY + enemyHeight &&
        playerHeight + playerY > enemyY) {
            player.init();
            console.log("sorrry, you need to try again");
    } 
}

// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.init();
    this.sprite = 'images/char-boy.png';
}

//player update when player win
Player.prototype.update = function() {
    if (this.y < 0) {
        console.log("congratulatton,you win the game!");
        this.init();
    }
}

// here is set the player in init position
Player.prototype.init = function() {
    this.x = 200;
    this.y = 320;
}

//render
Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//handleInput
Player.prototype.handleInput = function(keyType) {
    switch(keyType) {
        case "left":
            player.x -= 101;
            break;
        case "right":
            player.x += 101;
            break;
        case "up":
            player.y -= 82;
            break;
        case "down":
            player.y += 82;
            break;  
    } 
    //to keep the play in canva
    if (player.x < -2) {
        player.x = -2;
    }else if (player.x > 402) {
        player.x = 402;
    }
    if (player.y < -8) {
        player.y = -8;
    }else if (player.y > 402) {
       player.y = 402;
    }
}

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 4; i++) {
  allEnemies.push(new Enemy());
}
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
