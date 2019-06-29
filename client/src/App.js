import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div> 
        {/* Header */}
        <h1> Ming Newton </h1> 
        <h2> Calculate or parse anything! Give it a go. </h2>
        {/* User input & Button*/}
        <div class="level"> 
          <div class="level-left"> 
            
          </div> 
          <div class="level-right"> 
            <button class="button"> </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
