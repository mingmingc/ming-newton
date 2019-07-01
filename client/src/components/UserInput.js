// Next steps:
// 1) Refactor the form 
// 2) Dropdown/selection for operation ("select", etc)
// bonus: describe each operation
// 3) separate library for fetchResults function ("newton.js" to import later)
// Order of ops

import React, {Component} from 'react';
import { Button } from "react-bulma-components/full";

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //to track when results from API have loaded
      isLoaded: false,     
      operation: "",
      expression: "",
      result: "",
      error: {} 
    }
  };

  //Separate into another library to import later
  //Function takes operation + expression (given by user):
  // 1) URl encode expression
  // 2) build URL
  fetchResults(op, expr) { 
    this.setState({
      //loading
      isLoaded: false, //display breadcrumbs, spinner, etc
      result: "",
      error: {}
    });

    const encodedExpr = encodeURI(expr); //take user input & encode expression into URL format
    const url = `https://newton.now.sh/${op}/${encodedExpr}` 
    fetch(url) //consider using a dropdown for the operations
    .then(res => res.json())    //turn results to JSON obj
    .then(({operation, expression, result}) => {     //We use arrow function to unbind 'this', so 'this' refers to the instance of UserInput object as defined above 
      console.log({operation, expression, result}); //object descontruction
      this.setState({
        isLoaded: true,
        operation, expression, result
      })
    }) 
    .catch((error) => this.setState({ error }))
  }

  updateExpression(event) {
    this.setState({
      expression: event.target.value
    })
  }

  render() {
    const {operation, expression, result, error} = this.state;
    const op = 'derive';
    const expr = 'x^2';
    return (
      <div className ="container"> 
        {/* Header */}
        <h1 className="title is-1"> Ming Newton </h1> 
        {/* User input & Button on top level*/}
        <div className="level"> 
        {/* Form subcomponent */}
          <div className="level-left">     
            <div className="level-item"> 
              <p className="control is-expanded"> 
                <input className="input is-info is-fullwidth" type="text" placeholder="Enter what you want to calculate" 
                onChange={() => this.updateExpression()} />
               </p>
            </div>
          </div> 
          {/* Button subcomponent to send user input to server */}
          <div className="level-right"> 
            <div className="level-item"> 
              <p className="control"> 
                {/* Onclick points to fetchResults function */}
                <Button color="success" size="large" rounded outlined onClick={() => this.fetchResults(op,expr)}>Wowza!</Button> 
            </p>
          </div>  
          {/* results div  */}
        </div>
        <div>
          {/* make display results conditional as long as no error */}
          {operation} {' '}
          {expression} =
          {result}
          {/* give user more specific info about error */}
          {error ? error : ""} 
        </div> 
      </div>
    </div> 
    )
  }
}

export default UserInput;
