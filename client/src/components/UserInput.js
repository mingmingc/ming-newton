import React, {Component} from 'react';
import Form from './Form';
import SearchButton from './SearchButton';

class UserInput extends Component {
  constructor() {
    super();
    this.state = {
      equation: ""
    }
  };

  // componentDidMount(){
  //   this.sendToNewton(equation);
  // }

  // sendToNewton = query => {
  //   API.search(query)
  //   .then
  // }

  render() {
    return (
      <div className ="container"> 
        {/* Header */}
        <h1 className="title is-1"> Ming Newton </h1> 
        {/* User input & Button on top level*/}
        <div className="level"> 
        {/* Form subcomponent */}
          <div className="level-left"> 
            <Form 
              equation={this.state.equation}
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
              />
          </div> 
          {/* Button subcomponent to send user input to server */}
          <div className="level-right"> 
            <div className="level-item"> 
              <p className="control"> 
                <SearchButton />
            </p>
            </div>  
          </div>
        </div>
      </div>
    )
  }
}

export default UserInput;
