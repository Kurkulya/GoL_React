import React, { Component } from 'react';
import {Rect} from 'react-konva';
import Konva from 'konva';

class Cell extends Component {
    state = {
        color: this.props.value.color,
        isAlive: this.props.value.color,
        x: this.props.value.index.x,
        y: this.props.value.index.y,
        size: this.props.cellSize
    };
    render() {
        return (
            <Rect
                x={this.state.x}
                y={this.state.y}
                width={this.state.size}
                height={this.state.size}
                fill={this.state.color}
                shadowBlur={1}
                onClick={this.handleClick}
            />
        );
    }
}

export default Cell;