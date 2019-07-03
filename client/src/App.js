import React, { Component } from 'react';
// import { Button } from "react-bulma-components/full";
import posed from 'react-pose';
import './App.css';

const Button = posed.div({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.8 }
});

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

    this.fetchResults = this.fetchResults.bind(this);
  };

  //Separate into another library to import later
  //Function takes operation + expression (given by user):
  // 1) URL encode expression
  // 2) build URL
  fetchResults(op, expr) {
    // console.log(event.target.value);
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
        // console.log({ operation, expression, result }); //object descontruction
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
        <div className="container is-fluid is-centered">
          <h1 className="title is-1"> Ming Newton </h1>
          Calculator for all of your advanced math needs.
        </div>
        <div className="columns">
          <div className="column is-mobile">
            {/* Level left: dropdown & form for user to select operator & enter expression */}
            {/* Select operator, updates operation in this.state */}
            <select value={this.state.operation} onChange={this.handleChange} className="select">
              <option>Choose operator</option>
              <option value="simplify">Simplify</option>
              <option value="factor">Factor</option>
              <option value="derive">Derive</option>
              <option value="integrate">Integrate</option>
              <option value="zeroes">Find 0's</option>
              <option value="tangent">Find Tangent</option>
              <option value="area">Area Under Curve</option>
              <option value="cos">Cosine</option>
              <option value="sin">Sine</option>
              <option value="tan">Tangent</option>
              <option value="arccos">Inverse Cosine</option>
              <option value="arcsin">Inverse Sine</option>
              <option value="arctan">Inverse Tangent</option>
              <option value="abs">Absolute Value</option>
              <option value="log">Logarithm</option>
            </select>
          </div>
          <div className="column is-mobile">
            {/* Input expression: user types expression, this.state updated */}
            <input value={this.state.expression} onChange={this.handleChange} className="input is-info is-fullwidth" type="text" placeholder="Enter what you want to calculate"
            />
          </div>
          <div className="column is-mobile">
            <Button className="box" type="submit" color="success" size="large" value="Wowza!" rounded outlined />
            {/* onChange={() => this.fetchResults()} */}
          </div>
          {/* </form> */}
          
        </div>
        <div className="results"> 
          {/* results div  */}
          {/* make display results conditional as long as no error */}
          {operation} {' '}
          {expression} =
          {result}
          {/* give user more specific info about error */}
          {/* {error ? error : ""}  */}
        </div>
      </div>
    )
  }
}

export default App;
