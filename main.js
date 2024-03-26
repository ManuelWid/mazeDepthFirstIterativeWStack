// maze generation using depth first algorythm with iterative implementation (with stack)
// https://en.wikipedia.org/wiki/Maze_generation_algorithm
//
// pseudo code:
// 1. Choose the initial cell, mark it as visited and push it to the stack
// 2. While the stack is not empty
//     1 Pop a cell from the stack and make it a current cell
//     2 If the current cell has any neighbours which have not been visited
//         1 Push the current cell to the stack
//         2 Choose one of the unvisited neighbours
//         3 Remove the wall between the current cell and the chosen cell
//         4 Mark the chosen cell as visited and push it to the stack

// canvas setup
const canvas = document.querySelector("#canvas");
canvas.width = 800;
canvas.height = 520;
const ctx = canvas.getContext("2d");

// setup
const cell_width = 40;
const cols = Math.floor(canvas.width / cell_width);
const rows = Math.floor(canvas.height / cell_width);

const cells = initArray(cols, rows);
const stack = [];

// choose initial cell and push to stack
stack.push(cells[0][0]);
cells[0][0].visited = true;

// input setup
const speed_input = document.querySelector("#speed");
// for drawing only
let current = cells[0][0];
let speed_ms = 50;

speed_input.addEventListener("input", ()=>{
    speed_input.nextElementSibling.innerHTML = speed_input.value;
    speed_ms = speed_input.value;
});

function draw(){

    ctx.reset();
    ctx.fillStyle = "#222";
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            ctx.save();
            if(cells[i][j].visited){
                ctx.fillStyle = "#4f9647";
            }
            if(current.posX === i && current.posY === j){
                ctx.fillStyle = "#65c25b";
            }
            cells[i][j].show();
            ctx.restore();
        }
    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

async function generateMaze(){
    while(stack.length > 0){
        const cc = stack.pop();
        current = cc;
        const neighbors = [];
        const top = cells[cc.posX][cc.posY-1];
        const right = cells[cc.posX + 1] ? cells[cc.posX + 1][cc.posY] : undefined;
        const bottom = cells[cc.posX][cc.posY+1];
        const left = cells[cc.posX - 1] ? cells[cc.posX - 1][cc.posY] : undefined;
        
        if(top && !top.visited){
            neighbors.push(top);
        }
        if(right && !right.visited){
            neighbors.push(right);
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom);
        }
        if(left && !left.visited){
            neighbors.push(left);
        }

        if(neighbors.length > 0){
            stack.push(cc);
            const next = random(neighbors);
            current = next;
            cc.removeWalls(next);
            next.visited = true;
            stack.push(next);
        }

        await sleep(speed_ms);
    }
}

generateMaze();

function initArray(cols, rows){
    const arr = [];
    for(let i = 0; i < cols; i++){
        arr[i] = [];
        for(let j = 0; j < rows; j++){
            arr[i][j] = new Cell(i, j, cell_width);
        }
    }
    return arr;
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

function random(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}