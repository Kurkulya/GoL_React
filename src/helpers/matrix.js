import Konva from 'konva/konva';

class Matrix {
    constructor (matrixSize, cellSize, canvas) {
        this.ctx = canvas.getContext('2d');
        this.window = matrixSize;
        this.width = matrixSize.width / cellSize;
        this.height = matrixSize.height / cellSize;
        this.cellSize = cellSize;
        this.matrix = this.create();
        this.mirrorMatrix = this.create();
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
                this.matrix[i][j] = {
                    isAlive: Math.random() >= 0.5,
                    color: Konva.Util.getRandomColor()
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
        this.ctx.clearRect(0, 0, this.window.width, this.window.height);
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.matrix[i][j].isAlive) {
                    this.ctx.fillStyle = this.matrix[i][j].color;
                    this.ctx.strokeStyle = 'black';
                    this.ctx.shadowBlur = 1;
                    this.ctx.fillRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
                    this.ctx.strokeRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    };
    update = () => {
        for (let j = 0; j < this.width; j++) {
            for (let k = 0; k < this.height; k++) {
                let totalCells = 0;
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
                        if ((row !== j || col !== k) && this.matrix[row][col].isAlive === true) {
                            totalCells++;
                        }
                    }
                }
                switch (totalCells) {
                    case 2:
                        this.mirrorMatrix[j][k] = this.matrix[j][k];
                        break;
                    case 3:
                        this.mirrorMatrix[j][k] = {...this.matrix[j][k], isAlive: true};
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