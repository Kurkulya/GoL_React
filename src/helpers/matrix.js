import Konva from 'konva/konva';

class Matrix {
    constructor (matrixSize, cellSize, canvas) {
        this.ctx = canvas.getContext('2d');
        this.window = matrixSize;
        this.width = Math.floor(matrixSize.width / cellSize);
        this.height = Math.floor(matrixSize.height / cellSize);
        this.cellSize = cellSize;
        this.ctx.strokeRect(0, 0, matrixSize.width, matrixSize.height);
        this.ctx.fillStyle = '#444';
        this.ctx.fillRect(0,0,this.window.width, this.window.height);
        this.matrix = this.create();
        this.mirrorMatrix = this.create();
        this.randomise();
        this.tick();
        return this;
    }
    create = () => {
        let matrix = [];
        for (let i = 0; i < this.width; i++) {
            matrix[i] = [];
        }
        return matrix;
    };
    randomise = () => {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.mirrorMatrix[i][j] = {
                    isAlive: true,
                    color: null
                };
                this.matrix[i][j] = {
                    isAlive: false,
                    color: '#ffcc11'
                };
            }
        }
    };
    tick = () => {
        this.draw();
        this.update();
        requestAnimationFrame(this.tick);
    };
    draw = () => {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.matrix[i][j].isAlive !== this.mirrorMatrix[i][j].isAlive) {
                    this.ctx.beginPath();
                    this.ctx.arc(i * this.cellSize + this.cellSize / 2, j * this.cellSize + this.cellSize / 2, this.cellSize / 2, 0, 2 * Math.PI);
                    if (this.matrix[i][j].isAlive) {
                        this.ctx.fillStyle = this.matrix[i][j].color;
                        this.ctx.fill();
                        this.ctx.strokeStyle = "#666";
                        this.ctx.stroke();
                    } else {
                        this.ctx.strokeStyle = "#666";
                        this.ctx.stroke();
                        this.ctx.fillStyle = "#444";
                        this.ctx.fill();
                    }
                }
            }
        }
    };
    update = () => {
        for (let j = 0; j < this.width; j++) {
            for (let k = 0; k < this.height; k++) {
                let totalCells = 0;
                let color = '#ffcc11';
                for (let w = j - 1; w < j + 2; w++) {
                    for (let h = k - 1; h < k + 2; h++) {
                        const row = w < 0
                            ? this.width + w
                            : w >= this.width
                                ? w - this.width
                                : w;
                        const col = h < 0
                            ? this.height + h
                            : h >= this.height
                                ? h - this.height
                                : h;
                        if ((row !== j || col !== k) && this.matrix[row][col].isAlive) {
                            totalCells++;
                            if (this.matrix[row][col].color !== '#ffcc11') color = this.matrix[row][col].color;
                        }
                    }
                }
                switch (totalCells) {
                    case 2:
                        this.mirrorMatrix[j][k] = this.matrix[j][k];
                        break;
                    case 3:
                        this.mirrorMatrix[j][k] = {...this.matrix[j][k], isAlive: true, color: color};
                        break;
                    default:
                        this.mirrorMatrix[j][k] = {...this.matrix[j][k], isAlive: false};
                }
            }
        }

        let temp = this.matrix;
        this.matrix = this.mirrorMatrix;
        this.mirrorMatrix = temp;
    };
}

export default Matrix;