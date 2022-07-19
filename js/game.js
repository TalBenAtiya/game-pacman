'use strict'

const CHERRY = '🍒'
const SUPER_FOOD = '💠'
const WALL = '⬛'
const FOOD = '▫️'
const EMPTY = ' '
var gFoodCreated = 0
var gFoodEaten = 0
var gCherryInterval

var gGame = {
    score: 0,
    isOn: false
}
var gBoard

function init() {
    clearInterval(gCherryInterval)
    gFoodCreated = 0
    gFoodEaten = 0
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    printMat(gBoard, '.board-container')
gCherryInterval = setInterval(createCherry, 10000)
    gGame.isOn = true
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            gFoodCreated++

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                gFoodCreated--
            }

            if (i === 1 && j === 1 || i === 8 && j === 1 ||
                i === 1 && j === 8 || i === 8 && j === 8) {
                board[i][j] = SUPER_FOOD
                gFoodCreated--
            }

        }
    }
    gFoodCreated--
    console.log(gFoodCreated);
    return board
}

function createCherry() {
    const chosenCell = getEmptyCells()
    gBoard[chosenCell.i][chosenCell.j] = CHERRY
    renderCell(chosenCell, CHERRY)
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'block'


    const elModalTxt = document.querySelector('.modal span')
    if (gFoodCreated === gFoodEaten) {
        elModalTxt.innerText = `Game Over!\n YOU WIN!`
    } else {
        elModalTxt.innerText = `Game Over!\n YOU LOSE`
    }

}

function playAgain() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score
    init()
}
