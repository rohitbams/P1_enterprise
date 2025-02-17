class Enemy {
    constructor() {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);
        this.prevZ = this.z;
        this.health = 30;
    }

    // update() {
    //     if (this.z < 1) {
    //         this.z = width;
    //         this.x = random(-width, width);
    //         this.y = random(-height, height);
    //         this.prevZ = this.z;
    //       }
    // }

    shootAtShip() {
        
    }

}