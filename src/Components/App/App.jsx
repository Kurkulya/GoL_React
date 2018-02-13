import './App.scss';
import logo from '../../images/logo.svg';
import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                    <img className="App-logo" src={logo}/>
                </header>
                <p className="App-intro">
                    To get started, edit and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
