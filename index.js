const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5;
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }

        this.width = 40
        this.height = 40
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y +this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform {
    constructor () {
        this.position = {
            x: 100,
            y: 200
        }

        this.width = 200
        this.height = 20
    }
    draw () {
        ctx.fillStyle = "blue"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platform = new Platform() 

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platform.draw()

    if (keys.right.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed) {
        player.velocity.x = -5
    } else player.velocity.x = 0
        // Colision de plataformas
    if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0
    }
}

animate();

addEventListener("keydown", ({keyCode}) => {
    switch (keyCode) {
        case 65:
            console.log("left");
            keys.left.pressed = true
            break;
        case 83:
            console.log("down");
            break;
        case 68:
            console.log("right");
            keys.right.pressed = true
            break
        case 87:
            console.log("up");
            player.velocity.y -= 20
            break;
    }
    console.log(keys.right.pressed)
});

addEventListener("keyup", ({keyCode}) => {
    switch (keyCode) {
        case 65:
            console.log("left");
            keys.left.pressed = false
            break;
        case 83:
            console.log("down");
            break;
        case 68:
            console.log("right");
            keys.right.pressed = false
            break
        case 87:
            console.log("up");
            player.velocity.y -= 10
            break;
    }
    console.log(keys.right.pressed)
});