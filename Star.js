// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

function Star() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.prevZ = this.z;
    //console.log(this.prevZ);
  
    this.update = function() {
      this.z = this.z - starSpeed;
      if (this.z < 1) {
        this.z = width;
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.prevZ = this.z;
      }
    }
  
    this.show = function() {
      fill(255);
      noStroke();
  
      let sx = map(this.x / this.z, 0, 1, 0, width);
      let sy = map(this.y / this.z, 0, 1, 0, height);
      //console.log("this.x/this.z: " + this.x/this.z)

      let r = map(this.z, 0, width, 2, 0);
      ellipse(sx, sy, r, r);
  
      let prevX = map(this.x / this.prevZ, 0, 1, 0, width);
      let prevY = map(this.y / this.prevZ, 0, 1, 0, height);
  
      this.prevZ = this.z;
  
      //console.log(r);
      stroke(255);
      line(prevX, prevY, sx, sy);
  
    }
  }