$(document).ready(function () {

  initMatrix();

  initCanvas();

});

function initMatrix() {
  matrix = new Array(DIMENSION_HEIGHT);
  
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(DIMENSION_WIDTH);
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      matrix[i][j] = 0;
    }
  }
}

function initCanvas() {
  let canvas = $("#mycanvas");
  let canvasWidth = canvas.width();
  let canvasHeight = canvas.height();
  let PIXELSIZE = canvasWidth / DIMENSION_WIDTH;
  let enabled = true;

  clearCanvas(canvas);

  canvas.on('mousemove touchmove touchstart mousedown', mouseFill);
  
  function mouseFill(e) {
    
    if (GAME_ON) return;
    
    e.preventDefault(); // Disables scrolling for touch events.

    var touchstart = e.type === 'touchstart' || e.type === 'touchmove';
    e = touchstart ? e.originalEvent : e;
    var rect = $("#mycanvas");
    var offsetX = touchstart ? e.targetTouches[0].pageX - rect.offset().left : e.offsetX;
    var offsetY = touchstart ? e.targetTouches[0].pageY - rect.offset().top : e.offsetY;

    if (!enabled) return;
    if (e.which != 1 && !touchstart) return;

    pixel = [Math.floor(offsetX / PIXELSIZE), Math.floor(offsetY / PIXELSIZE)];

    window.fillPixel(canvas, pixel);
  }
}

function clearCanvas(canvas) {
  let context = canvas.get(0).getContext("2d");
  let canvasWidth = canvas.width();
  let canvasHeight = canvas.height();

  context.clearRect(0, 0, canvasWidth, canvasHeight);

  context.strokeStyle = 'rgba(0,0,0,0.1)';
  for (let i = 0; i < DIMENSION_WIDTH; ++i) {
    x = Math.floor(i * canvasWidth / DIMENSION_WIDTH);
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvasHeight);
    context.stroke();
  }

  for (let i = 0; i < DIMENSION_HEIGHT; ++i) {
    y = Math.floor(i * canvasHeight / DIMENSION_HEIGHT);
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvasWidth, y);
    context.stroke();
  }
}

window.save = function() {

  this.console.log("Saving current state...");

  currentMatrix = matrix;

  // $.post('draw.php?submit=1', data, function (rsp) {
  //   $('body').append(rsp);
  //   $("#saveButton").attr('disabled', false);
  // });
}

window.reset = function() {
  GAME_ON = false;
  initMatrix();
  clearCanvas($("#mycanvas"));
}

window.start = function() {
  GAME_ON = true;
  
  setInterval(() => {
    if (GAME_ON) {
      runGameRound();
    }
  }, 20);

  function runGameRound() {
    let t0 = performance.now();
    let canvas = $("#mycanvas");
    
    let dirx = [0, 0, 1, 1, 1, -1, -1, -1];
    let diry = [1, -1, -1, 0, 1, -1, 0, 1];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {

        // count filled neighbors
        let count = 0;
        for (let k = 0; k < 8; k++) {
          let x = i + dirx[k];
          let y = j + diry[k];
          if (x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length && Math.abs(matrix[x][y]) == 1) {
            count++;
            if (count > 3) break;
          }
        }

        // if no neighbor: too lonely, die
        // 2 neighbors: do nothing
        // 3 neighbors: grow
        // 4 or more neighbors: too crowded, die
        if ((matrix[i][j] == 1) && (count < 2 || count > 3)) {
          // -1 signifies the cell is now dead but originally was live.
          matrix[i][j] = -1;
        }
        if (matrix[i][j] == 0 && count == 3) {
          // 2 signifies the cell is now live but was originally dead.
          matrix[i][j] = 2;
        } 
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j] == -1) {
          window.fillPixel(canvas, [j, i], false);
        } else if (matrix[i][j] == 2) {
          window.fillPixel(canvas, [j, i], true);
        }
      }
    }
    let t1 = performance.now();

    console.log(t1 - t0);
  }
}

window.stop = function() {
  GAME_ON = false;
}

window.deepCopy = function(input) {

  temp = new Array(DIMENSION_WIDTH);
  
  for (let i = 0; i < temp.length; i++) {
    temp[i] = new Array(DIMENSION_HEIGHT);
  }

  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < temp[0].length; j++) {
      temp[i][j] = input[i][j];
    }
  }

  return temp;
}

window.fillPixel = function(canvas, pixel, shouldFill = true) {

  let context = canvas.get(0).getContext("2d");
  let selectedColor = '#222244';
  let PIXELSIZE = canvas.width() / DIMENSION_WIDTH;

  if (shouldFill) {
    // fill canvans grid
    context.fillStyle = selectedColor;
    context.fillRect(pixel[0] * PIXELSIZE, pixel[1] * PIXELSIZE, PIXELSIZE - 1, PIXELSIZE - 1);
  } else {
    // clear canvas grid
    context.clearRect(pixel[0] * PIXELSIZE, pixel[1] * PIXELSIZE, PIXELSIZE - 1, PIXELSIZE - 1);
  }
  
  // write to matrix
  matrix[pixel[1]][pixel[0]] = shouldFill ? 1 : 0;
}
