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
        ctx.fillStyle = "orange";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}

class Platform {
    constructor ({x, y}) {
        this.position = {
            x,
            y,
        }

        this.width = 700
        this.height = 100

        this.image = new Image()
        this.image.src = "./platform.png"
    }
    draw () {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

// Creación de jugador
let player = new Player()

// Creacion de plataformas 
let platforms = [new Platform({x: 100, y: 500,}), new Platform({x: 600, y : 940}), new Platform({x: 1200, y: 940})]

// Teclas
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}


let victorycount = 0


// Función que crea el game over
function init() {
 player = new Player()
 platforms = [new Platform({x: 100, y: 500,}), new Platform({x: 600, y : 940}), new Platform({x: 1200, y: 940})]

 victorycount = 0
}


function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    });

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            victorycount += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        } else if (keys.left.pressed) {
            victorycount -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        }
    }

        // Colision de plataformas
        platforms.forEach(platform => {
    if (
        player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0
    }
})
 // Ganar
    if (victorycount > 2000) {
        console.log("you win")
    }

    // Perder
    if (player.position.y > canvas.height) {
        console.log("you lose")
        init();
    }

}

animate();


// Controles

addEventListener("keydown", ({keyCode}) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = true
            break;
        case 83:
            break;
        case 68:
            keys.right.pressed = true
            break
        case 87:
            player.velocity.y -= 10
            break;
    }
});

addEventListener("keyup", ({keyCode}) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false
            break;
        case 83:
            break;
        case 68:
            keys.right.pressed = false
            break
        case 87:
            player.velocity.y -= 0
            break;
    }
});