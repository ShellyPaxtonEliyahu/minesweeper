'use strict'
const MINE = '💣'
const FLAG = '🚩'
const NUMBER = ''

var gBoard
// var gLevel = {
//     size: 4,
//     mines: 2
// }
// var gGame = {
//     isOn: false,
//     shownCount: 0,
//     markedCount: 0,
//     secsPassed: 0
// }


function initGame() {
    gBoard = createBoard()
    renderBoard(gBoard)
    // if(!isOn) return true

}

function createBoard() {
    var size = 4
    const board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: i * 4 + j,
                isShown: false,
                isMine: (Math.random() <= 0.1),
                isMarked: false
            }
        }

    }
    return board
}


function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            var currCell = ''
            if (board[i][j].isShown || board[i][j].isMarked) {
                currCell = board[i][j].isMarked ? FLAG : board[i][j].isMine ? MINE : board[i][j].minesAroundCount
                console.log(currCell)
            }
            var cellClass = getClassName({ i: i, j: j })

            if (currCell === MINE) cellClass += ' mine'
            else if (currCell === FLAG) cellClass += ' flag'
            else if (currCell === NUMBER) cellClass += ' number'

            strHTML += `<td class="cell ${cellClass}" onclick="onCellClick(event, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i},${j}); return false">${currCell}`
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    console.log(strHTML)
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}

function onCellClick(cell, cellI, cellJ) {
    var cell = getClassName({ i: cellI, j: cellJ })
    console.log(cell)
    if (gBoard[cellI][cellJ].isShown || cell === FLAG) return
    else {
        gBoard[cellI][cellJ].isShown = true
    }
    countMinesAround(gBoard, cellI, cellJ)
    renderBoard(gBoard)

}

function countMinesAround(board, rowIdx, colIdx) {
    var mine = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            if (board[i][j].isMine) mine++
        }
    }
    gBoard[rowIdx][colIdx].minesAroundCount = mine

}

function cellMarked(cell, cellI, cellJ) {
    console.log('adgdaf')

    if (gBoard[cellI][cellJ].isShown) return

    else {
        console.log('gsfgf')
        gBoard[cellI][cellJ].isMarked = !gBoard[cellI][cellJ].isMarked
    }
    renderBoard(gBoard)

}

function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}





// function onToggleGame(elToggleBtn) {
//     if (gGameInterval) {
//         clearInterval(gGameInterval)
//         gGameInterval = null
//         elToggleBtn.innerText = '🙂'
//     }

// }



// '😵😎🤯'