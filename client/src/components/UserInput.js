import React, {Component} from 'react';

class UserInput extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div class ="container"> 
        {/* Header */}
        <h1> Ming Newton </h1> 
        {/* User input & Button*/}
        <div class="level"> 
          <div class="level-left"> 
            <div class="level-item"> 
              <p class="control is-expanded"> 
                <input class="input is-info is-fullwidth" type="text" placeholder="Enter what you want to calculate" />
              </p>
            </div>
          </div> 
          <div class="level-right"> 
            <div class="level-item"> 
              <p class="control"> 
                <a class="button is-primary">Go</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserInput;
