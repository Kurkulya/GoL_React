import React, { Component } from 'react';
import Matrix from '../../helpers/matrix';

class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 1800,
            columns: 900,
            cellSize: 10,
        };
    }
    componentDidMount () {
        let matrix = new Matrix({width: this.state.rows, height: this.state.columns}, this.state.cellSize, this.canvas);
        matrix.randomise();
        matrix.tick();
    }
    render() {
        return (
            <div>
                <canvas ref={(canvas) => this.canvas = canvas} width={this.state.rows} height={this.state.columns}/>
            </div>
        );
    }
}

export default Field;