document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");

    const GRID_SIZE = 200;
    const GRID_WIDTH = 10;
  
  
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
    }

    window.addEventListener('keydown', e => {
        switch (e.key) {            
            case "ArrowUp":
                
                break;
    
            case "ArrowDown":
                
                break;
    
            case "ArrowLeft":
                
                break;
    
            case "ArrowRight":
                
                break;
    
            default:
                break;
        }
    });

    function init() {
        createGrid();
    }
    
    init();

  })