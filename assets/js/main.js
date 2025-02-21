let score = 0
let moveInterval = 1200
let timerInterval
let timeRemaining = 30
let gameActive = false

const clown = document.querySelector("#clown")
const scoreDisplay = document.querySelector("#score")
const timerDisplay = document.querySelector("#timer")
const gameContainer = document.querySelector("#game-container")
const menuContainer = document.querySelector("#menu-container")
const optionsMenu = document.querySelector("#options-menu")
const endScreen = document.querySelector("#end-screen")
const finalScoreDisplay = document.querySelector("#final-score")
const startButton = document.querySelector("#start-button")
const optionsButton = document.querySelector("#options-button")
const quitButton = document.querySelector("#quit-button")
const backButton = document.querySelector("#back-button")
const replayButton = document.querySelector("#replay-button")
const volumeControl = document.querySelector("#volume")
const difficultySelect = document.querySelector("#difficulty")

const bgMusic = new Audio('./assets/audio/hisokatheme.mp3')
bgMusic.loop = true

const clickSound = new Audio('./assets/audio/boing.mp3')

// Function for the volume control
function updateVolume() {
    const volume = volumeControl.value / 100
    bgMusic.volume = volume
    clickSound.volume = volume
}

volumeControl.addEventListener('input', updateVolume)
updateVolume()

function moveClown() {
    let maxWidth = gameContainer.clientWidth - clown.clientWidth
    let maxHeight = gameContainer.clientHeight - clown.clientHeight

    let randomX = Math.floor(Math.random() * maxWidth)
    let randomY = Math.floor(Math.random() * maxHeight)
    let randomRotation = Math.floor(Math.random() * 360)

    clown.style.left = `${randomX}px`
    clown.style.top = `${randomY}px`

    clown.style.transform = `rotate(${randomRotation}deg)`

    

}

let moveIntervalID

function startGame() {
    score = 0
    timeRemaining = 30
    gameActive = true
    scoreDisplay.textContent = `Score: ${score}`
    timerDisplay.textContent = `Temps restant: ${timeRemaining} sec`

    menuContainer.style.display = "flex"
    gameContainer.style.display = "block"
    endScreen.style.display = "none"

    bgMusic.play()

    timerInterval = setInterval(() => {
        timeRemaining--
        timerDisplay.textContent = `Temps restant: ${timeRemaining} sec`
        if (timeRemaining <= 0) {
            endGame()
        }
    }, 1000)

    moveClown()

    moveIntervalID = setInterval(moveClown, moveInterval)
}

function endGame() {
    clearInterval(timerInterval)
    clearInterval(moveIntervalID)
    gameActive = false
    gameContainer.style.display = "none"
    endScreen.style.display = "flex"
    finalScoreDisplay.textContent = `Score final: ${score}`

    bgMusic.pause()
}

clown.addEventListener('click', () => {
    if (gameActive) {
        score++
        scoreDisplay.textContent = `Score: ${score}`
        clickSound.play()
        moveClown()
    }
})

startButton.addEventListener('click', startGame)

optionsButton.addEventListener('click', () => {
    menuContainer.style.display = 'none'
    optionsMenu.style.display = 'flex'
})

quitButton.addEventListener('click', () => {
    window.close() 
})

backButton.addEventListener('click', () => {
    optionsMenu.style.display = 'none'
    menuContainer.style.display = 'flex'
})

replayButton.addEventListener('click', startGame)

difficultySelect.addEventListener('change', (event) => {
    const difficulty = event.target.value
    if (difficulty === 'easy') {
        moveInterval = 1700
    } else if (difficulty === 'medium') {
        moveInterval = 1200
    } else if (difficulty === 'hard') {
        moveInterval = 500
    }
})
