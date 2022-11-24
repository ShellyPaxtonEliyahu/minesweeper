// getRandomInt:

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
////////////////////////////////////////////////////////////

//getRandomColor:

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
////////////////////////////////////////////////////////////

//shuffle arrays 1:

function drawNums() {
    return gNums.pop()
}
function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length);
        keep = items [i];
        items[i]=items[randIdx];
        items[randIdx]=keep;
    }
    return items;
}

//shuffle arrays 2:

function drawNums(){
    var randIdx = getRandomInt(0,gNums.length);
    var num = gNums[randIdx];
    gNums.splice(randIdx,1);
    return num
}
////////////////////////////////////////////////////////////

// reset num:
function resetNums() {
    gNums = []
    for (var i = 0; i < gNumsRange; i++) {
        gNums.push(i + 1)
    }
}
////////////////////////////////////////////////////////////

// create board:
function createBoard() { 
    var size = gSize
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = VAR
        }
    }
    return board
}
////////////////////////////////////////////////////////////  

// render board to the dom:
function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            strHTML += `<td data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${currCell})" >${currCell}</td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML += strHTML
}
//////////////////////////////////////////////////////////// 

// render new matrix:

function copyMat(mat) {
    var newMat = []
    for (var i = 0; i < mat.length; i++) {
      newMat[i] = []
      for (var j = 0; j < mat[0].length; j++) {
        newMat[i][j] = mat[i][j]
      }
    }
    return newMat
}
////////////////////////////////////////////////////////////

//render cell to dom:
  // location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}
////////////////////////////////////////////////////////////

// show/hide element:
function hideElement(selector) {
    const el = document.querySelector(selector)
    el.classList.add('hidden')
}
  
function showElement(selector) {
    const el = document.querySelector(selector)
    el.classList.remove('hidden')
}
////////////////////////////////////////////////////////////  
  
// get a cell to an array:
function getEmptyCell(board) {
    const emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]
            if (currCell.gameElement === null && currCell.type !== WALL)
                emptyCells.push({ i: i, j: j })
        }
    }
    //* CHOOSE A RANDOM INDEX FROM THAT ARRAY AND RETURN THE CELL ON THAT INDEX
    const randomIdx = getRandomInt(0, emptyCells.length - 1)
    return emptyCells[randomIdx]
}
////////////////////////////////////////////////////////////

//neighbors loop:
function countMinesAround(board, rowIdx, colIdx) {

    for (var i = rowIdx -1 ; i <= rowIdx +1;i++) {
      if (i<0 || i >= board.length) continue
      for (var j = colIdx -1 ; j <= colIdx +1 ; j++) {
        if (i === rowIdx && j === colIdx) continue
        if (j <0|| j >= board[0].length) continue
        var currCell = board[i][j]
        
      }
    }
}

