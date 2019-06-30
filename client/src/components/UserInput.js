import React, {Component} from 'react';
import Form from './Form';
import SearchButton from './SearchButton';

class UserInput extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className ="container"> 
        {/* Header */}
        <h1> Ming Newton </h1> 
        {/* User input & Button on top level*/}
        <div className="level"> 
        {/* Form subcomponent */}
          <div className="level-left"> 
            <Form />
          </div> 
          {/* Button subcomponent to send user input to server */}
          <div className="level-right"> 
            <SearchButton />
          </div>
        </div>
      </div>
    )
  }
}

export default UserInput;
