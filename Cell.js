class Cell {
    constructor(a, b, c) {
        this.start = false;
        this.end = false;

        this.top = true;
        this.bottom = true;
        this.left = true;
        this.right = true;

        this.visited = false;

        this.xInd = a;
        this.yInd = b;

        this.x = a*c;
        this.y = b*c;
        this.x_w = a*c + c;
        this.y_w = b*c + c;

        this.size = 25;

        this.pathVisit = false;
        this.previousCell = undefined;
        this.highlighted = false;

        this.show = function () {
          stroke("#ff1500");
          strokeWeight(2); // Thicker
          //top wall
          if (this.top) {
            line(this.x_w, this.y, this.x, this.y);
          }
          //left wall
          if (this.left) {
            line(this.x, this.y, this.x, this.y_w);
          }
          //bottom wall
          if (this.bottom) {
            line(this.x, this.y_w, this.x_w, this.y_w);
          }
          //right wall
          if (this.right) {
            line(this.x_w, this.y_w, this.x_w, this.y);
          }
          if (this.visited) {
            noStroke();
            fill("#b19cd9");
            rect(this.x, this.y, 20, 20);
          }
        };

        this.showPath = function() {
            if(this.pathVisit == true && ((this.xInd != 0 && this.yInd != 0) || (this.yInd != 24 && this.yInd != 24))) {
                noStroke();
                fill("#C41E3A");
                rect(this.x, this.y, 20,20);
            }
        }

        this.pathConstruction = function() {
          if(this.highlighted) {
            noStroke();
            fill("#68228B");
            rect(this.x, this.y, 20, 20);
          }
        }

        this.highlight = function () {
          noStroke();
          fill("purple");
          rect(this.x, this.y, 20, 20);
        };
        this.makeStart = function() {
            this.start = true;
        }
        this.makeEnd = function() {
            this.end = true;
        }
        this.showStart = function() {
            noStroke();
            fill("grey");
            rect(this.x, this.y, 20, 20);
        }
        this.showEnd = function() {
            noStroke();
            fill("grey");
            rect(this.x, this.y, 20, 20);
        }
    }
}