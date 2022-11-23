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
            if (board[i][j].isShown) {
                currCell = board[i][j].isMine ? MINE : board[i][j].minesAroundCount
            }

            var cellClass = getClassName({i:i,j:j})

            if(currCell === MINE) cellClass += ' mine'
            else if (currCell === FLAG) cellClass += ' flag'
            else if (currCell === NUMBER) cellClass += ' number'

            strHTML += `<td class="cell ${cellClass}" onclick="onCellClick(${i}, ${j})">${currCell}`
        }
        strHTML += ''
    }
    console.log(strHTML)
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}


function onCellClick(elCell) {

}







function getClassName (location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}
// function setMinesNegsCount() {

// }















// function onToggleGame(elToggleBtn) {
//     if (gGameInterval) {
//         clearInterval(gGameInterval)
//         gGameInterval = null
//         elToggleBtn.innerText = '🙂'
//     }

// }



// '😵😎🤯'