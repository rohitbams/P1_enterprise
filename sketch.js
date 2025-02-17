
// add gravity to asteroids flying nearby that will pull the enterprise towards it and destroy it
// first level fewer asteroids come in the way, gradually increase with levels, harder to speed up
// faster you get to the end, higher your score
// hitting asteroids and enemies also increase score
// add scoring system
// add phasers to destroy enemies / asteroids
// add a radar that shows asteroids / enemies
// add warp speed!!!
// add first person view?
// add shields for taking damage
// add micro:bit sound for enemy hit and shoots
// make the blocks come to you even if the ship is stationary



let length = 180;
let ship;
let projectile;
let difficulty = 5;
let colours;
let stars = [];
let starSpeed;

let score;
let health;

let blocks = [];
let blockSpeed; // random speed for different blocks
let block;
let blockX, blockY, blockZ;

let time = 0;
let milliseconds = 0;
let seconds = 0;

let speedBar = 0;
let gravity = 5;
let force = 0;
let speed = 10;
let mass;
let acceleration = 1 / mass * force;
let deceleration = 0.70;

let enterprise;
let enterpriseMenu;

let stage = 0;
let connectBtn;

let port;
let font;

function preload() {
    font = loadFont("assets/LeagueMono-Regular.otf");
    enterprise = loadModel("assets/enterprise/enterprise.obj", true);
    enterpriseMenu = loadImage("assets/enterprise/enterprise.jpg");
}

function setup() {
    // coordinate plane
    // (-x,-y) | (x,-y)
    // (-x, y) | (x, y)
    createCanvas(800, 800, WEBGL);
    // debugMode();

    port = createSerial();

    let usedPorts = usedSerialPorts();
    if (usedPorts.length > 0) {
        port.open(usedPorts[0], 115200);
    }

    connectBtn = createButton("Connect to Micro:bit");
    connectBtn.mousePressed(connectBtnClick);

    textSize(20);

    ship = new Ship(50, 150, 0);
    projectile = new Projectile();

    for (let i = 0; i < 800; i++) {
        stars[i] = new Star();
    }
    // if stage/difficulty 1, blocks[].length is 1, then higher
    for (let i = 0; i < 1; i++) {
        blocks[i] = new Block();
    }
}

function connectBtnClick() {
    if (!port.opened()) {
        port.open("MicroPython", 115200);
    } else {
        port.close();
    }
}

function menu() {
    push();
    textAlign(CENTER);
    fill(43, 83, 167);
    textFont(font);
    textSize(28);
    text("Starship Enterprise", 0, -280)
    pop();

    push();
    textAlign(CENTER);
    fill(167,19,19);
    textFont(font);
    text(" Press any button on your Micro:bit or \n click anywhere on the screen to start game", 0, -230);
    pop();

    push();
    textAlign(CENTER);
    fill(214, 164, 68);
    textFont(font);
    textSize(18);
    text("Objective: avoid the energy blasts", 0, -160);
    pop();

    push();
    textAlign(CENTER);
    fill(193,199,48);
    textFont(font);
    textSize(16);
    text("Controls: \n\n Press A to accelarate \nPress B to decelerate", 0, -110);
    pop();
    
    push();
    image(enterpriseMenu, -220, -40, 550 / 1.2, 414 / 1.2);
    pop();

    let str = port.read();
    if (str.length > 0) {
        if (mouseIsPressed == true || str.includes("a") || str.includes("b")) {
            stage = 1;
            console.log(stage);
        }
        port.clear();
    }
}


// function microBitReceivedMessage(message) {
//     xTilt = map(message, -90, 90, 0, width - 90);
//     yTilt = map(message, -90, 90, 0, height - 90);
// }


function readMicroBit() {
    let str = port.read();
    console.log(str);
    if (str.length > 0) {
        if (str.includes("a")) {
            ship.speedUp();
        }
        if (str.includes("b")) {
            ship.slowDown();
        }
        if (str.includes("x") && str.includes("-")) {
            ship.moveSideways(-0.12);
        }
        if (str.includes("x") && !str.includes("-")) {
            ship.moveSideways(0.12)
        }
        if (str.includes("y") && str.includes("-")) {
            ship.moveUpDown(-0.12);
        }
        if (str.includes("y") && !str.includes("-")) {
            ship.moveUpDown(0.12);
        }

        port.clear();
    }

}

function drawStars() {
    push();
    starSpeed = map(speedBar * 2, 0, width, 0, 50);
    translate(0, 0);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
    pop();
}

function drawBlocks() {
    if (time > 12) {
        push();
        blockSpeed = map(speedBar / 2, 0, width * 2, 0, 50);
        translate(0, 0);
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].update();
            blocks[i].show();
            block = blocks[i];

            blockX = int(block.x);
            blockY = int(block.y);
            blockZ = int(blockZ);


            if (
                blockX >= ship.x - 10 && blockX <= ship.x + 10 &&
                blockY >= ship.y - 10 && blockY <= ship.y + 10) {
                ship.takeDamage();
                //block.changeColour();
            }

        }
        pop();
    }
}

function drawSpeedBar() {
    push();
    fill('wheat');
    textAlign(LEFT);
    textFont(font);
    text("Speed: " + int(speedBar), -350, -350);
    pop();
}

function drawHealthBar() {
    push();
    fill('wheat');
    textAlign(LEFT);
    textFont(font);
    text("Health: " + int(ship.health), -100, -350);
    pop();
}

function timeTracker() {
    time = time + 1;
    milliseconds = millis();
    seconds = milliseconds / 1000;
    push();
    fill('pink');
    textAlign(RIGHT);
    textFont(font);
    text("Score: " + (int(seconds)), 350, -350);
    pop();
}

function game() {
    // stars
    drawStars();

    // blocks
    drawBlocks();

    // health bar text
    drawHealthBar();

    // speed bar text
    drawSpeedBar();

    //time tracker
    timeTracker();

    // controls
    controls();

    // camera
    translate(0, 0, -ship.z - 50);

    // render ship
    ship.render();
    push();
    ship.run();
    pop();

    if (ship.health < 1) {
        stage = 2;
        // gameOver();
    }

}

function controls() {
    // controls
    readMicroBit();

    {    // if (keyIsDown(LEFT_ARROW)) {
        //     ship.moveSideways(-1);
        // }
        // if (keyIsDown(RIGHT_ARROW)) {
        //     ship.moveSideways(1);
        // }

        // if (keyIsDown(UP_ARROW)) {
        //     ship.moveUpDown(-1);
        // }
        // if (keyIsDown(DOWN_ARROW)) {
        //     ship.moveUpDown(1);
        // }

        // if (keyIsDown(83)) { 
        //     ship.slowDown();
        // }
        // if (keyIsDown(87)) {
        //     ship.speedUp();
        // }
    }
}

{// function keyPressed() {
    //     if (keyCode === 81) {
    //         ship.shootProjectile();
    //         if (projectile.y < 300) {
    //             projectile.remove();
    //         }
    //     }
    // }
}

function gameOver() {
    // stage = 0;
    push();
    textAlign(CENTER);
    fill('red');
    textFont(font);
    text("You Lost! \n Press any button on your Micro:bit or \n click anywhere on the screen to play again", 0, 0);
    pop();
    ship.health = 100;
    // seconds = 0


    let str = port.read();
    if (str.length > 0) {
        if (mouseIsPressed == true || str.includes("a") || str.includes("b")) {
            stage = 1;
            game();
            // console.log(stage);
        }
        port.clear();
    }
    // if (startGameButton.mouseIsPressed == true) {
    //     stage = 1;
    //     game();
    //     //console.log(stage);
    // }
    // draw game over message
}

function draw() {
    background(13);
    lights();

    if (!port.opened()) {
        connectBtn.html("Connect to Micro:bit");
    } else {
        connectBtn.html("Disconnect");
    }

    if (mouseIsPressed == true) {
        stage = 1;
        console.log(stage);
    }

    if (stage == 0) {
        menu();
    }
    if (stage == 1) {
        game();
    }
    if (stage == 2) {
        gameOver();
    }
}
