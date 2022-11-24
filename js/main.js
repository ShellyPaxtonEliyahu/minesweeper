'use strict'
const MINE = '💣'
const FLAG = '🚩'
const NUMBER = ''

var gBoard
var gSize
var gMines
var gEndGame
var gSec
var gTimer

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function initGame(size = gSize, mines = gMines) {
    gBoard = createBoard(size, mines)
    renderBoard(gBoard)
    gSize = size
    gMines = mines
    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    document.getElementById("minesCount").innerText = mines
    clearInterval(gTimer)
    document.getElementById('timer').innerHTML = 0
    gSec = 0
    document.getElementsByClassName("start-btn")[0].innerText = '🙂'
}

function createBoard(size, mines) {
    const board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    var list = shuffleIdxList(size)
    for (var m = 0; m < mines; m++) {
        var idx = list[m]
        var row = parseInt(idx / size)
        var col = parseInt(idx % size)
        board[row][col].isMine = true

    }


    return board
}

function shuffleIdxList(size) {
    var list = []
    for (var i = 0; i < size * size; i++) {
        list[i] = i
    }
    return shuffle(list)
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            var currCell = ''
            if (board[i][j].isShown || board[i][j].isMarked) {
                currCell = board[i][j].isMarked ? FLAG : board[i][j].isMine ? MINE : board[i][j].minesAroundCount === 0 ? ' ' : board[i][j].minesAroundCount

            }
            var cellClass = getClassName({ i: i, j: j })

            if (currCell === MINE) cellClass += ' mine'
            else if (currCell === FLAG) cellClass += ' flag'
            else cellClass += ' number'

            strHTML += `<td class="cell ${cellClass}" onclick="onCellClick(${i}, ${j})" oncontextmenu="cellMarked(${i},${j}); return false">${currCell}`
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }

    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}

function onCellClick(cellI, cellJ) {
    if (!gGame.isOn) return
    if (gBoard[cellI][cellJ].isShown || gBoard[cellI][cellJ].isMarked) return
    gBoard[cellI][cellJ].isShown = true
    countMinesAround(gBoard, cellI, cellJ)

    if (!gBoard[cellI][cellJ].isMine) gGame.shownCount++
    if (gGame.shownCount === 1) setTime()

    checkGameOver(cellI, cellJ)
    renderBoard(gBoard)
    if (gBoard[cellI][cellJ].minesAroundCount === 0) openZeros(cellI, cellJ)
}

function openZeros(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[0].length) continue
            onCellClick(i, j)
        }
    }
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

function cellMarked(cellI, cellJ) {
    if (!gGame.isOn) return
    if (gBoard[cellI][cellJ].isShown) return
    gGame.markedCount = gBoard[cellI][cellJ].isMarked ? gGame.markedCount - 1 : gGame.markedCount + 1
    gBoard[cellI][cellJ].isMarked = !gBoard[cellI][cellJ].isMarked
    renderBoard(gBoard)
    document.getElementById("minesCount").innerText = gMines - gGame.markedCount
}

function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}
function checkGameOver(cellI, cellJ) {
    if (gGame.shownCount === 0) {
        shuffleMines()
        onCellClick(cellI, cellJ)
        return
    }
    if (gBoard[cellI][cellJ].isMine) lostGame()
    var numOfGoodCells = gSize * gSize - gMines
    if (gGame.shownCount === numOfGoodCells) wonGame()

}

function lostGame() {
    gGame.isOn = false
    clearInterval(gTimer)
    showMines(false)
    document.getElementsByClassName("start-btn")[0].innerText = '🤯'
    window.alert("You lose...")
}
function wonGame() {
    gGame.isOn = false
    clearInterval(gTimer)
    showMines(true)
    document.getElementsByClassName("start-btn")[0].innerText = '😎'
    window.alert("You win!")
}

function showMines(mark) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (!gBoard[i][j].isMine) continue
            gBoard[i][j].isShown = true
            if (mark) gBoard[i][j].isMarked = true
        }
    }
    renderBoard(gBoard)
}

function shuffleMines() {
    for (var i = 0; i < gSize; i++) {
        for (var j = 0; j < gSize; j++) {
            gBoard[i][j].isMine = false
            gBoard[i][j].isShown = false
        }
    }
    var list = shuffleIdxList(gSize)
    for (var m = 0; m < gMines; m++) {
        var idx = list[m]
        var row = parseInt(idx / gSize)
        var col = parseInt(idx % gSize)
        gBoard[row][col].isMine = true
    }
}
function setTime() {
    gSec = 0
    gTimer = setInterval(() => {
        gSec++
        document.getElementById('timer').innerHTML = gSec
    }, 1000)
}


'😎🙂🤯'