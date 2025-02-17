function Block() {
    this.x = random(-75, 75);
    this.y = random(-75, 75);
    this.z = random(100);
    this.prevZ = this.z;
  
    this.update = function() {
      this.z = this.z - blockSpeed;
      if (this.z < 1) {
        this.z = 75;
        this.x = random(-75, 75);
        this.y = random(-75, 75);
        this.prevZ = this.z;
      }
    }
  
    this.show = function() {
      fill(170);
      //noStroke();
  
      let sx = map(this.x / this.z, 0, 1, 0, 75);
      let sy = map(this.y / this.z, 0, 1, 0, 75);
  
      let r = map(this.z, 0, 75, 2, 0);
      ellipse(sx, sy, r*40, r*40);
  
      let px = map(this.x / this.prevZ, 0, 1, 0, 75);
      let py = map(this.y / this.prevZ, 0, 1, 0, 75);
  
      this.prevZ = this.z;
  
      stroke(255);
      line(px, py, sx, sy);
  
    }
  }