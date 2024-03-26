class Cell {
    constructor(cellX, cellY, size){
        this.posX = cellX;
        this.posY = cellY;
        this.size = size;

        this.x = this.posX * this.size;
        this.y = this.posY * this.size;

        this.walls = [1,1,1,1];

        this.visited = false;
    }

    show(){
        ctx.fillRect(this.x,this.y,this.size,this.size);
        // ctx.strokeStyle = "#4f9647";
        ctx.strokeStyle = "#33612e";
        if(this.walls[0]){
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.size, this.y);
            ctx.stroke();
        }
        if(this.walls[1]){
            ctx.beginPath();
            ctx.moveTo(this.x + this.size, this.y);
            ctx.lineTo(this.x + this.size, this.y + this.size);
            ctx.stroke();
        }
        if(this.walls[2]){
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.size);
            ctx.lineTo(this.x + this.size, this.y + this.size);
            ctx.stroke();
        }
        if(this.walls[3]){
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.size);
            ctx.stroke();
        }
    }

    removeWalls(other){
        if(this.posX < other.posX){
            this.walls[1] = 0;
            other.walls[3] = 0;
        }
        if(this.posX > other.posX){
            this.walls[3] = 0;
            other.walls[1] = 0;
        }
        if(this.posY < other.posY){
            this.walls[2] = 0;
            other.walls[0] = 0;
        }
        if(this.posY > other.posY){
            this.walls[0] = 0;
            other.walls[2] = 0;
        }
    }

    drawPoint(x, y, w){
        ctx.ellipse(x, y, w, w, 0, 0, Math.PI * 2);
    }
}