
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



let length = 180;
let ship;
let difficulty = 5;
let colours;
let stars = [];
let starSpeed;

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
    createCanvas(800, 800, WEBGL);
    //textFont(font);
    textSize(20);
    // makeTiles(difficulty);
    ship = new Ship(50, 150, 0);
    //ship.jump();
    for (var i = 0; i < 800; i++) {
        stars[i] = new Star();
    }
}

function keyPressed() {
    if (key === " ") {
        ship.jump();
    }
}

function draw() {
    background(13);
    lights();
    
    push();
    starSpeed = map(speedBar*2, 0, width, 0, 50);
    translate(0, 0);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
    pop();

    // speed bar
    push();
    fill('wheat');
    textAlign(LEFT);
    textFont(font);
    text(int(speedBar), -350, -350);
    pop();


    time = time + 1;
    milliseconds = millis();
    seconds = milliseconds / 1000;

    push();
    fill('pink');
    textAlign(RIGHT);
    textFont(font);
    text((int(seconds)), 350, -350);
    pop();

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

    translate(0, 0, -ship.z - 50);

    ship.render();
    push();
    ship.run();
    pop();
}

