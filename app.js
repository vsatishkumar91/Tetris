document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    let squares;
    let displaySquares

    let previousGrid = document.querySelector(".next-shape-grid")
    const scoreDisplay = document.querySelector('.score-display')
    const highScoreDisplay = document.querySelector('.high-score-display')
    const linesDisplay = document.querySelector('.lines-score')


    const GRID_SIZE = 200;
    const GRID_WIDTH = 10;
    const width = 10

    let currentRotation = 0
    let score = 0
    let lines = 0
    let timerId
    let nextRandom = 0
    let highScore = 0;


    const colors = [
        'url(images/blue_block.png)',
        'url(images/green_block.png)',
        'url(images/pink_block.png)',
        'url(images/purple_block.png)',
        'url(images/peach_block.png)',
        'url(images/yellow_block.png)',
        'url(images/navy_block.png)',
    ]

    //The Tetrominoes
    const lTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
    ]

    const reverseLTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 0],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2]
    ]

    const zTetromino = [
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
    ]

    const reverseZTetromino = [
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
    ]

    const tTetromino = [
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
    ]

    const iTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
    ]

    const theTetrominoes = [lTetromino, reverseLTetromino, zTetromino, reverseZTetromino, tTetromino, oTetromino, iTetromino]



    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]
    let currentPosition = 4

    //show previous tetromino in scoreDisplay
    const displayWidth = 4
    let displayIndex = 0

    const smallTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
        [1, displayWidth + 1, displayWidth * 2 + 1, 0],
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
        [1, displayWidth, displayWidth + 1, displayWidth * 2],
        [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
        [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
    ]

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('block')
            squares[currentPosition + index].style.backgroundImage = colors[random]
        })
    }

    //undraw the shape
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('block')
            squares[currentPosition + index].style.backgroundImage = 'none'
        })
    }

    function moveright() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if (!isAtRightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('top-tile'))) {
            currentPosition -= 1
        }
        draw()
    }

    function moveleft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) currentPosition -= 1
        if (current.some(index => squares[currentPosition + index].classList.contains('top-tile'))) {
            currentPosition += 1
        }
        draw()
    }

    function rotate() {
        undraw()
        currentRotation++
        if (currentRotation === current.length) {
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    function moveDown() {
        undraw()
        currentPosition = currentPosition += width
        draw()
        freeze()
    }

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('block')
            square.style.backgroundImage = 'none'
        })
        smallTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('block')
            displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom]
        })
    }

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('last-line') || squares[currentPosition + index + width].classList.contains('top-tile'))) {
            current.forEach(index => squares[index + currentPosition].classList.add('top-tile'))
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    function addScore() {
        for (currentIndex = 0; currentIndex < GRID_SIZE; currentIndex += GRID_WIDTH) {
            const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9]
            if (row.every(index => squares[index].classList.contains('top-tile'))) {
                score += 10
                lines += 1
                scoreDisplay.innerHTML = score;
                if(score > highScore) {
                    setHighScroe(score);
                }
                linesDisplay.innerHTML = lines
                row.forEach(index => {
                    squares[index].style.backgroundImage = 'none'
                    squares[index].classList.remove('top-tile') || squares[index].classList.remove('block')

                })
                //splice array
                const squaresRemoved = squares.splice(currentIndex, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('top-tile'))) {
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
        }
    }

    function readHighScroe() {
        highScore = localStorage.getItem("tetris-highScore");
        if (highScore === null) {
            highScore = 0;
            localStorage.setItem("tetris-highScore", JSON.stringify(highScore))
        }
        else {
            highScore = JSON.parse(highScore);
            highScoreDisplay.innerHTML = highScore;
        }
    }

    function setHighScroe(hScore) {
        highScore = hScore;
        localStorage.setItem("tetris-highScore", JSON.stringify(hScore));
        highScoreDisplay.innerHTML = hScore;
    }

    function createGrid() {
        for (let i = 0; i < GRID_SIZE; i++) {
            let gridElement = document.createElement("div")
            grid.appendChild(gridElement)
        }

        for (let i = 0; i < GRID_WIDTH; i++) {
            let gridElement = document.createElement("div")
            gridElement.setAttribute("class", "last-line")
            grid.appendChild(gridElement)
        }

        for (let i = 0; i < 16; i++) {
            let gridElement = document.createElement("div")
            previousGrid.appendChild(gridElement);
        }
    }

    window.addEventListener('keydown', e => {
        switch (e.key) {
            case "ArrowUp":
                rotate();
                break;

            case "ArrowDown":
                moveDown();
                break;

            case "ArrowLeft":
                moveleft();
                break;

            case "ArrowRight":
                moveright();
                break;

            default:
                break;
        }
    });

    function init() {
        createGrid();
        readHighScroe();
        squares = Array.from(grid.querySelectorAll('div'))
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        displaySquares = document.querySelectorAll('.next-shape-grid div')
        displayShape();
    }

    init();

})