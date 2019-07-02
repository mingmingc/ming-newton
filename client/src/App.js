import React, { Component } from 'react';
import { Button } from "react-bulma-components/full";
import './App.css';

// Next steps:
// 1) Refactor the form 
// 2) Dropdown/selection for operation ("select", etc)
// bonus: describe each operation
// 3) separate library for fetchResults function ("newton.js" to import later)
// Order of ops


class App extends Component {
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
  // 1) URL encode expression
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
      .then(({ operation, expression, result }) => {     //We use arrow function to unbind 'this', so 'this' refers to the instance of UserInput object as defined above 
        console.log({ operation, expression, result }); //object descontruction
        this.setState({
          isLoaded: true,
          operation, expression, result
        })
      })
      .catch((error) => this.setState({ error }))
  }

  render() {
    const { operation, expression, result, error } = this.state;
    console.log(operation);
    console.log(expression);
    console.log(result);
    console.log(error);
    // const op = 'derive';
    // const expr = 'x^2';
    return (
      <div>
        <div className="container">
          <h1 className="title is-1"> Ming Newton </h1>
          Calculator for all of your advanced math needs.

          {/* Level left: dropdown & form for user to select operator & enter expression */}
          {/* Select operator */}
          <form onSubmit={this.updateExpression}>
            <select className="select">
              <option>Choose operator</option>
              <option>Simplify</option>
              <option>Factor</option>
              <option>Derive</option>
              <option>Integrate</option>
              <option>Find 0's</option>
              <option>Find Tangent</option>
              <option>Area Under Curve</option>
              <option>Cosine</option>
              <option>Sine</option>
              <option>Tangent</option>
              <option>Inverse Cosine</option>
              <option>Inverse Sine</option>
              <option>Inverse Tangent</option>
              <option>Absolute Value</option>
              <option>Logarithm</option>
            </select>
            {/* Enter */}
            <input className="input is-info is-fullwidth" type="text" placeholder="Enter what you want to calculate"
            />
            {/* onChange={() => this.updateExpression()}  */}
            {/* Onclick points to fetchResults function */}
            {/* Button */}
            <Button type="submit" color="success" size="large" value="Wowza!"/>
          </form>

          {/* rounded outlined onClick={() => this.fetchResults(op, expr)} */}
        </div>

        <div>
          {/* results div  */}
          {/* make display results conditional as long as no error */}
          {operation} {' '}
          {expression} =
              {result}
          {/* give user more specific info about error */}
          {/* {error ? error : ""}  */}
        </div>
      </div >
    )
  }
}

export default App;
