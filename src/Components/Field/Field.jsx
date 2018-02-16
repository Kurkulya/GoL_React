import React, { Component } from 'react';
import Matrix from '../../helpers/matrix';
import Konva from "konva/konva";

class Field extends Component {
    constructor(props) {
        super(props);
        this.rows = document.documentElement.clientWidth;
        this.columns = document.documentElement.clientHeight;
        this.cellSize = 10;
    }
    componentDidMount () {
        this.matrix = new Matrix({width: this.rows, height: this.columns}, this.cellSize, this.canvas);
    }
    drawLine = (event) => {
        const x = Math.floor(event.clientX / this.cellSize);
        const y = Math.floor(event.clientY / this.cellSize);
        this.matrix.matrix[x][y] = {isAlive: true, color: Math.random() * (1000 - 1) + 1 >= 998 ? 'whitesmoke' : '#ffcc11'};
        this.matrix.matrix[x + 1][y + 1] = {isAlive: true, color: '#ffcc11'};
        this.matrix.matrix[x - 1][y - 1] = {isAlive: true, color: '#ffcc11'};
        this.matrix.matrix[x - 1][y + 1] = {isAlive: true, color: '#ffcc11'};
        this.matrix.matrix[x + 1][y - 1] = {isAlive: true, color: '#ffcc11'};
    };
    setPoint = (event) => {
        const x = Math.floor(event.clientX / this.cellSize);
        const y = Math.floor(event.clientY / this.cellSize);
        this.matrix.matrix[x][y].isAlive = true;
    };
    render() {
        return (
            <div className='field'>
                <canvas ref={(canvas) => this.canvas = canvas} width={this.rows + 2} onClick={this.setPoint} onMouseMove={this.drawLine} height={this.columns + 2}/>
                {/*<input type="number" ref={(input) => this.cellSizeInput = input} onInput={this.changeCellState}/>*/}
                {/*<button onClick={this.clearMatrix}>CLEAR</button>*/}
            </div>
        );
    }
}

export default Field;