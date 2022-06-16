const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const canvasDiv = document.getElementById("canvas-game-div")
const startButton = document.getElementById("start-button")
const startDiv = document.getElementById("start-div")
const gameoverDiv = document.getElementById("game-over-div");
const restartButton = document.getElementById("restart-button");
const backMenu = document.getElementById("back-menu");

let jumpaudio = new Audio ("./jump_sound.mp3");
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

        this.width = 75
        this.height = 100

        this.image = new Image();
        this.image.src = "./sprite_idle.png"
        this.frames = 0
        this.frames2 = 0
    }

    draw() {
        ctx.drawImage(
        this.image,
        32 * this.frames,
        0,
        32,
        32,
        this.position.x, 
        this.position.y, 
        this.width, 
        this.height)
    }

    update() {
        //this.frames++
        this.frames2++
        if (this.frames2 % 9 === 0) {
            this.frames++
        }
        if (this.frames >= 4) this.frames = 0
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
        this.image.src = "./Grass.png"
    }
    draw () {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

class Platform2 {
    constructor ({x, y}) {
        this.position = {
            x,
            y,
        }

        this.width = 100
        this.height = 100

        this.image = new Image()
        this.image.src = "./Grass.png"
    }
    draw () {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}
class Platform3 {
    constructor ({x, y}) {
        this.position = {
            x,
            y,
        }

        this.width = 30
        this.height = 30

        this.image = new Image()
        this.image.src = "./Grass.png"
    }
    draw () {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

class PlatformCloud {
    constructor ({x, y}) {
        this.position = {
            x,
            y,
        }

        this.width = 700
        this.height = 300

        this.image = new Image()
        this.image.src = "./cloud1.png"
    }
    draw () {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

// Creación de jugador
let player = new Player()

// Creacion de plataformas 
let platforms = [new Platform({x: 0, y: 940,}),
    new PlatformCloud({x: 200, y: 50}), 
    new Platform2({x: 700, y: 800}), 
    new Platform2({x: 800, y: 700}), 
    new Platform2({x: 900, y: 550}), 
    new Platform2({x: 1150, y: 400}), 
    new Platform2({x: 1550, y: 400}),
    new Platform2({x: 1920, y: 350}),
    new Platform2({x: 2350, y: 400}),
    new Platform3({x: 2650, y: 410}),
    new Platform3({x: 2950, y: 410}),
    new Platform3({x: 3250, y: 410}),
    new Platform2({x: 3580, y: 400}),
    new Platform2({x: 3850, y: 395}),
    new Platform2({x: 3850, y: 900}),
    new Platform3({x: 4250, y: 900}),
    new Platform3({x: 4450, y: 800}),
    new Platform3({x: 4650, y: 700}),
    new Platform3({x: 4850, y: 600}),
    new Platform({x: 5000, y: 500}),]

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
 platforms = [new Platform({x: 0, y: 940,}),
    new PlatformCloud({x: 200, y: 50}), 
    new Platform2({x: 700, y: 800}), 
    new Platform2({x: 800, y: 700}), 
    new Platform2({x: 900, y: 550}), 
    new Platform2({x: 1150, y: 400}), 
    new Platform2({x: 1550, y: 400}),
    new Platform2({x: 1920, y: 350}),
    new Platform2({x: 2350, y: 400}),
    new Platform3({x: 2650, y: 410}),
    new Platform3({x: 2950, y: 410}),
    new Platform3({x: 3250, y: 410}),
    new Platform2({x: 3580, y: 400}),
    new Platform2({x: 3850, y: 395}),
    new Platform2({x: 3850, y: 900}),
    new Platform3({x: 4250, y: 900}),
    new Platform3({x: 4450, y: 800}),
    new Platform3({x: 4650, y: 700}),
    new Platform3({x: 4850, y: 600}),
    new Platform({x: 5000, y: 500}),]


 victorycount = 0
 restartButton.classList.add("hidden");
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
    } else if ((keys.left.pressed && player.position.x > 100) || keys.left.pressed && victorycount === 0 && player.position.x > 0) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            victorycount += 1
            console.log(victorycount)
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        } else if (keys.left.pressed && victorycount > 0) {
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
        gameoverDiv.classList.remove("hidden");
        canvasDiv.classList.add("hidden");
        restartButton.classList.remove("hidden");
        backMenu.classList.remove("hidden");
    }

    // Perder
    if (player.position.y > canvas.height) {
        gameoverDiv.classList.remove("hidden");
        canvasDiv.classList.add("hidden");
        restartButton.classList.remove("hidden");
        backMenu.classList.remove("hidden");
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
            player.velocity.y -= 12
            jumpaudio.play();
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

startButton.addEventListener("click", function(){
    animate();
    canvasDiv.classList.remove("hidden");
    startDiv.classList.add("hidden");
});

restartButton.addEventListener("click", function(){
    //document.location.reload();
    init();
    canvasDiv.classList.remove("hidden");
    backMenu.classList.add("hidden");
});

backMenu.addEventListener("click", function(){
    document.location.reload();
});