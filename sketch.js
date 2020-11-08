
var i = 0;
var j = 0;
var cells = [];
var current;
var stack = [];
var queue = new Queue();
var pathisFound = false;
var pathFound = 0;
var pathCurr;

function setup() {
  createCanvas(500, 500).position(400, 100);
  background("#DF6589FF");
  frameRate(5000);
  var col = floor(500 / 20);
  var row = floor(500 / 20);
  for (let y = 0; y < row; y++) {
    cells[y] = [];
    for (let x = 0; x < col; x++) {
      cells[y][x] = new Cell(x, y, 20);
    }
  }

  current = cells[0][0];
  current.makeStart();
  cells[24][24].makeEnd();
  queue.enqueue(cells[0][0]);
  pathCurr = cells[0][0];

}
function draw() {
  var col = floor(500 / 20);
  var row = floor(500 / 20);
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      cells[y][x].show();
      cells[y][x].pathConstruction();
      //cells[y][x].showPath()
    }
  }
  current.highlight();
  current.visited = true;
  var next = checkNeighbour(current);
  if (next != undefined) {
    next.visited = true;
    stack.push(current);
    //
    removeWalls(current,next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

  //Pathfinding Algorithm
  if(stack.length == 0) {
    current.showStart();
    cells[24][24].showEnd();
    if(queue.isEmpty && pathFound == 0) {
      console.log(i);
      i++;
      pathCurr = queue.dequeue();
      console.log(pathCurr)
      pathCurr.pathVisited = true;
      if (pathCurr.end) {
        pathFound = 1;
      } else {
        console.log("does this run");
        var x = pathCurr.xInd;
        var y = pathCurr.yInd;
        var count = 0;
        //For all the remaining walls
        //check if the cell exists, and then check if theres a wall blocking them
        //check top
        if (checkIndex(y-1,x)) {
          console.log("a");
          if (!pathCurr.top && !cells[y-1][x].pathVisit) {
            console.log("aa")
            queue.enqueue(cells[y-1][x]);
            cells[y - 1][x].previousCell = pathCurr;
            cells[y - 1][x].pathVisit = true;
          }
        }
        if (checkIndex(y + 1, x)) {
          console.log("b");
          if (!pathCurr.bottom && !cells[y + 1][x].pathVisit) {
            console.log("bb");
            queue.enqueue(cells[y + 1][x]);
            cells[y + 1][x].previousCell = pathCurr;
            cells[y + 1][x].pathVisit = true;
          }
        }
        if (checkIndex(y, x - 1)) {
          console.log("c");
          if (!pathCurr.left  && !cells[y][x - 1].pathVisit) {
            console.log("cc");
            queue.enqueue(cells[y][x - 1]);
            cells[y][x - 1].previousCell = pathCurr;
            cells[y][x - 1].pathVisit = true;
          }
        }
        if (checkIndex(y, x + 1)) {
          console.log("d");
          if (!pathCurr.right && !cells[y][x + 1].pathVisit) {
            console.log("dd");
            queue.enqueue(cells[y][x + 1]);
            cells[y][x + 1].previousCell = pathCurr;
            cells[y][x + 1].pathVisit = true;
          }
        }
        console.log("does it get to here")
      }
    }
  }
  if (pathFound == 1) {
    //backtrack path
    if (pathCurr) {
      pathCurr.highlighted = true;
      pathCurr = pathCurr.previousCell;
    }
  }

}

function checkNeighbourPath(pathCurr) {
  // Add or find all its possible neighbours.
    var neighbours = []; 
    var x = pathCurr.xInd;
    var y = pathCurr.yInd;

    //For all the remaining walls
    //check if the cell exists, and then check if theres a wall blocking them
    //check top
    if (checkIndex(y-1,x)) {
      if (pathCurr.top && !pathCurr.pathVisit) {
        neighbours.push(cells[y-1][x]);
      }
    }
    if (checkIndex(y + 1, x)) {
      if (pathCurr.bottom && !pathCurr.pathVisit) {
        neighbours.push(cells[y + 1][x]);
      }
    }
    if (checkIndex(y, x - 1)) {
      if (pathCurr.left && !pathCurr.pathVisit) {
        neighbours.push(cells[y][x - 1]);
      }
    }
    if (checkIndex(y, x + 1)) {
      if (pathCurr.right && !pathCurr.pathVisit) {
        neighbours.push(cells[y][x + 1]);
      }
    }
    if (neighbours.length > 0) {
      var rand = floor(random(0,neighbours.length));
      neighbours[rand].previousCell = pathCurr;
      neighbours[rand].pathVisit = true;
      return neighbours[rand];
    } else {
      return undefined;
    }
}

function checkNeighbour(cellObj) {
    // Add or find all its possible neighbours.
    var neighbours = []; 
    var x = cellObj.xInd;
    var y = cellObj.yInd;
    
    //check if there is a neighbour above
    if (checkIndex(y - 1, x) && !cells[y - 1][x].visited) {
      neighbours.push(cells[y - 1][x]);
    }
    //below
    if (checkIndex(y + 1, x) && !cells[y + 1][x].visited) {
      neighbours.push(cells[y + 1][x]);
    }
    //to the left
    if (checkIndex(y, x - 1) && !cells[y][x - 1].visited) {
      neighbours.push(cells[y][x - 1]);
    }
    //to the right
    if (checkIndex(y, x + 1) && !cells[y][x + 1].visited) {
      neighbours.push(cells[y][x + 1]);
    }

    if (neighbours.length > 0) {
      var rand = floor(random(0,neighbours.length));
      return neighbours[rand];
    } else {
      return undefined;
    }

}

function checkIndex(y,x) {
  if (x < 0 || x >= 25 || y < 0 || y >= 25) {
      return false;
  } else {
      return true;
  }
}

function removeWalls(curr, next) {
  var x = curr.xInd - next.xInd;
  var y = curr.yInd - next.yInd;
  if (x == 0 && y == -1) {
    curr.bottom = false;
    next.top = false;
  }
  else if (x == 0 && y == 1) {
    curr.top = false;
    next.bottom = false;
  }
  else if (x == 1 && y == 0) {
    curr.left = false;
    next.right = false;
  }
  else if (x == -1 && y == 0) {
    curr.right = false;
    next.left = false;
  }
}

  
  //Starting point

