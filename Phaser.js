class Phaser {
    constructor() {
        this.x = ship.x;
        this.y = ship.y;
        this.z = ship.z;
        this.prevZ = this.z;
    }

    show() {

        fill('blue');

        let sx = map(this.x / this.z, 0, 1, 0, -width);
        let sy = map(this.y / this.z, 0, 1, 0, -height);
        let r = map(this.z, 0, -width, 2, 0);

        ellipse(sx, sy, r, r);

        let prevX = map(this.x / this.prevZ, 0, 1, 0, -width);
        let prevY = map(this.y / this.prevZ, 0, 1, 0, -height);
        this.prevZ = this.z;


        stroke(255);
        line(prevX, prevY, sx, sy);

    }

}