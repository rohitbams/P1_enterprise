
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
let driveSec;
let nacelles;
let saucer;
let shipAux;

let stage = 0;
let startGameButton;

let port;
let font;

function preload() {
    font = loadFont("assets/LeagueMono-Regular.otf");
    enterprise = loadModel("assets/enterprise/enterprise.obj", true);
    driveSec = loadImage("assets/enterprise/Bake_DriveSec.png");
    nacelles = loadImage("assets/enterprise/Bake_Nacelles.png");
    saucer = loadImage("assets/enterprise/Bake_Saucer.png");
    shipAux = loadImage("assets/enterprise/Bake_ShipAux.png");
}

function setup() {
    // coordinate plane
    // (-x,-y) | (x,-y)
    // (-x, y) | (x, y)
    createCanvas(800, 800, WEBGL);
    // debugMode();
    //port = createSerial();
    textSize(20);

    startGameButton = createButton("Start Game");

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



function menu() {
    push();
    textAlign(CENTER);
    fill('white');
    textFont(font);
    text("Click the button to start game", -30, 0);
    push();
    if (startGameButton.mouseIsPressed == true) {
        stage = 1;
        console.log(stage);
    }
}

{
    // function mousePressed() {
    //     microBitConnect();
    // }
}

function microBitReceivedMessage(message) {

}

function game() {
    // stars
    push();
    starSpeed = map(speedBar * 2, 0, width, 0, 50);
    translate(0, 0);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
    pop();


    //console.log
    //blocks
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
                blockY >= ship.y - 10 && blockY  <= ship.y + 10 ) {
                    ship.takeDamage();
                    //block.changeColour();
            }
            
        }
        pop();
    }



    // // health bar text
    push();
    fill('wheat');
    textAlign(LEFT);
    textFont(font);
    text("Health: " + int(ship.health), -100, -350);
    pop();

    // speed bar text
    push();
    fill('wheat');
    textAlign(LEFT);
    textFont(font);
    text("Speed: " + int(speedBar), -350, -350);
    pop();

    //time tracker
    time = time + 1;
    milliseconds = millis();
    seconds = milliseconds / 1000;
    push();
    fill('pink');
    textAlign(RIGHT);
    textFont(font);
    text((int(seconds)), 350, -350);
    pop();

    // controls
    if (keyIsDown(LEFT_ARROW)) {
        ship.moveSideways(-1);
    }
    if (keyIsDown(RIGHT_ARROW)) {
        ship.moveSideways(1);
    }

    if (keyIsDown(UP_ARROW)) {
        ship.moveUpDown(-1);
    }
    if (keyIsDown(DOWN_ARROW)) {
        ship.moveUpDown(1);
    }

    if (keyIsDown(83)) {
        ship.slowDown();
    }
    if (keyIsDown(87)) {
        ship.speedUp();
    }
    
   

    // if (keyIsDown(81)) {
    //     ship.shootProjectile();
    // }

    // camera
    translate(0, 0, -ship.z - 50);

    // render ship
    ship.render();
    push();
    ship.run();
    pop();

}

function keyPressed() {
    if (keyCode === 81){
        ship.shootProjectile();
        if (projectile.y < 300) {
            projectile.remove();
        }
    }
}

function gameOver() {
    stage = 0;
}

function draw() {
    background(13);
    lights();

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
    // if (keyIsDown(81)) {
    //     ship.shootProjectile();
    // }
    
    // projectile.show();


}

