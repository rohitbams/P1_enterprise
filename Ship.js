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
        this.health = 100;
        this.phaser;
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
        }
    }
    run() {
        this.z = this.z - this.speed;
    }
    moveSideways(direction) {
        this.x += this.sidewaysSpeed * direction;
    }
    moveUpDown(direction) {
        this.y += this.upDownSpeed * direction;
    }
    
    takeDamage() {
        if (flyingBlock.z == this.z && flyingBlock.x == this.x && flyingBlock.y == this.y) {
            this.health = this.health - 10;
            health = this.health;
            console.log(this.health);
        }
    }

    shootPhaser() {
            phaser = new Phaser();
    }

    die() {
        if (ship.health == 0) {
            gameOver();
        }
    }

    render() {
        push();
        // orbitControl();
        normalMaterial();
        // ambientMaterial(255);
        // stroke(1);
        
        translate(this.x, this.y, this.z);
        rotateX(135);
        brightness('white');
        model(enterprise);
        //texture(driveSec, nacelles, saucer, shipAux);
        pop();
    }
}
