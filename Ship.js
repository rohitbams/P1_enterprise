class Ship {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = 25;
        this.speedY = 10;
        this.speed = 0;
        this.sidewaysSpeed = 120;
        this.upDownSpeed = 120;
        this.health = 100;
        //this.projectile;
        // this.acceleration = 1/this.mass * force;
        // this.mass = 10;
        // this.velocity = this.z / deltaTime;
        // this.momentum = this.mass * this.velocity;
    }
    speedUp() {
        // add warp speed!!!
        for (let i = 0; i < 24; i++) {
            if (speedBar < 360) {
                speedBar = (speedBar + 1);
            }
            ship.speed = speedBar;
        }
    }
    slowDown() {
        for (let i = 0; i < 12; i++) {
            if (speedBar > 0) {
                speedBar = (speedBar - 1);
            }
            ship.speed = speedBar;
        }
    }
    run() {
        // this.z = this.z - this.speed;
    }
    // coordinate plane
    // (-x,-y) | (x,-y)
    // (-x, y) | (x, y)
    moveSideways(direction) {
        if (this.x > -400 && this.x < 400) {
            this.x += this.sidewaysSpeed * direction;
        }
    }

    moveUpDown(direction) {
        if (this.y > -400 && this.y < 400) {
            this.y += this.upDownSpeed * direction;
        }
    }

    takeDamage() {
        if (this.health > 0 ) {
        this.health = this.health - 10;
        }
        if (this.health < 1) {
            stage = 2;
        }
        console.log(this.health);
    }

    shootProjectile() {
        projectile.show();
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
