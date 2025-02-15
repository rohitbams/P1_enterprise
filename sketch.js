// let ground = [];
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
    ship = new Ship(50, 150, 0); // spawn ship
    //ship.jump();
    for (var i = 0; i < 800; i++) {
        stars[i] = new Star();
    }
}

// create tiles
// function makeTiles(difficulty) {
//     makeGround(ground, difficulty);
// }

// switch statement for pause screen and main game scene

// function makeGround(array, difficulty) {
//     array.splice(0);
//     for (let i = 0; i < length; i++) {
//         array.push([]);
//         for (let j = 0; j < 4; j++) {
//             // create 4 columns per row with with random values 0 & 1
//             if (array[j] < 6) {
//                 array[i].push(1);
//             } else {
//                 array[i].push(random(1) < 0.5 - difficulty / 100 ? 0 : 1)
//             }
//         }
//     }
// }

function keyPressed() {
    if (key === " ") {
        ship.jump();
    }
}

// console.log(ground.length);

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
        // console.log(ship.z); 
        // console.log("spdBar " + int(speedBar) + " spd "+ ship.speed)
    }



    translate(0, 0, -ship.z - 50);
    // ship.speedUp();
    // ship.slowDown();
    // translate(0, 0, -ship.z-50); // (x, y, z)



    // roads with holes
    // for (let i = 0; i < length; i++) {
    //     for (let j = 0; j < 4; j++) {
    //         if (ground[i][j] == true) {
    //             push();
    //             // (x is center position, y is vertical tilt, z affects the distacne between planes drawn)
    //             translate(j * 100 - 150, 200, -i * 100);
    //             //noStroke();
    //             rotateX(PI / 2);
    //             //ambientMaterial('yellow', 50);
    //             noStroke();
    //             //fill('pink');
    //             plane(80, 200); // what if i made the plane longer
    //             pop();
    //         }
    //     }
    // }

    ship.render();
    push();
    ship.run();
    pop();

}

class Ship {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = 25;
        this.speedY = 0;
        this.speed = 0;
        this.sidewaysSpeed = 10;
        this.upDownSpeed = 5;
        // this.acceleration = 1/this.mass * force;
        // this.mass = 10;
        // this.velocity = this.z / deltaTime;
        // this.momentum = this.mass * this.velocity;
    }
    speedUp() {
        // add warp speed!!!
        for (let i = 0; i < 12; i++) {
            if (speedBar <= 240) {
                speedBar = (speedBar + 0.05);
            }
            ship.speed = speedBar;
        }
    }
    slowDown() {
        for (let i = 0; i < 28; i++) {
            if (speedBar > 0) {
                speedBar = (speedBar - 0.05);
            }
            ship.speed = speedBar;
        } // console.log(this.z);
    }
    run() {
        this.z = this.z - this.speed;
    }
    moveSideways(direction) {
        this.x += this.sidewaysSpeed * direction;
        // console.log(this.x);
    }
    moveUpDown(direction) {
        this.y += this.upDownSpeed * direction;
        // console.log(this.x);
    }

    // add gravity to asteroids flying nearby that will pull the enterprise towards it and destroy it
    // add scoring system
    // add phasers to destroy enemies / asteroids



    // now useless
    // jump() {
    //     const i = floor(-this.z / 100);
    //     const j = floor(this.x / 100) + 2;
    //     if (this.y >= 150 && (i < 0 ? true : ground[i][j])) {
    //         this.speedY = -this.force;
    //     }
    // }

    render() {
        push();
        //orbitControl();
        //spotLight(255, 0, 0, 0, 0, 0, 1, 0, 0);
        //pointLight(255, 255, 0, 0, 1, 0);
        
        normalMaterial();
        // ambientMaterial(255);
        // stroke(1);
        
        translate(this.x, this.y, this.z);
        rotateX(135);
        brightness(2000);
        model(enterprise);
        //texture(driveSec, nacelles, saucer, shipAux);
        pop();
    }
}