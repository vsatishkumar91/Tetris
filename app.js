document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    let squares;

    let previousGrid = document.querySelector(".previous-grid")


    const GRID_SIZE = 200;
    const GRID_WIDTH = 10;
    const width = 10

    let currentRotation = 0
  

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
  const displaySquares = document.querySelectorAll('.previous-grid div')
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
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
          currentPosition -= 1
        }
        draw()
      }
    
      function moveleft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) currentPosition -= 1
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
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
      }
  
  
    function createGrid() {
      for (let i = 0; i < GRID_SIZE; i++) {
        let gridElement = document.createElement("div")
        grid.appendChild(gridElement)
      }
  
      for (let i = 0; i < GRID_WIDTH; i++) {
        let gridElement = document.createElement("div")
        gridElement.setAttribute("class", "block3")
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
        squares = Array.from(grid.querySelectorAll('div'))
        draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      displayShape();
    }
    
    init();

  })