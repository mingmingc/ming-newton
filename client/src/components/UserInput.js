import React, {Component} from 'react';
import Form from './Form';
import SearchButton from './SearchButton';

class UserInput extends Component {
  constructor() {
    super();
    this.state = {
      result: "",
      isLoaded: false //to track when results from API have loaded
    }
  };

  //fetch call inside componentDidMount()
  componentDidMount() {
    fetch('https://newton.now.sh/derive/x%5E2')
    .then(res => res.json()) //turn results to JSON obj
    .then(json => {
      //use arrow function to unbind this, so we are using
      //the 'this' ??? what is 'this' again??
      //is it the instance of UserInput?
      this.setState({
        isLoaded: true,
        result: json,
      })
    }) 
  }

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
