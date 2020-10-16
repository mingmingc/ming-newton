import React, { Component } from 'react';
import posed from 'react-pose';
import './App.css';

/*
Next steps:
Clear this.state.result when new operation is selected
User validation & error messages
    do not use capital letters
Create guide to symbols & formatting
Add description for each operation
Separate library for fetchResults function ("newton.js" to import later)
Work on layout/UI - spacing, describe ops for user, styling, examples
*/

const Animated = posed.div({
  hoverable: true,
  init: { scale: 1 },
  hover: { scale: 1.1 },
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //to track when results from API have loaded
      isLoaded: false,
      operation: "",
      expression: "",
      result: "",
      error: {}
    }
    this.onChange = this.onChange.bind(this);
    this.fetchResult = this.fetchResult.bind(this);
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    }, () => {
      this.fetchResult();
    });
  }

  /* Separate into another library to import later
   Function takes operation + expression (given by user):
   1) URL encode expression
   2) build URL
  */
 
  fetchResult() {
    let encodedExpr = encodeURIComponent(this.state.expression.toLowerCase()); //take user input & encode expression into URL format
    const url = `https://newton.now.sh/api/v2/${this.state.operation}/${encodedExpr}`
    fetch(url) 
      .then(res => res.json())    //turn results to JSON obj
      .then(({ operation, expression, result }) => {     //Use arrow function to unbind 'this', so 'this' refers to the instance of UserInput object as defined above  
      this.setState({
          isLoaded: true,
          result
        })
      })
      .catch((error) => this.setState({ error }))
  }
  render() {
    // eslint-disable-next-line
    const { operation, expression, result, error } = this.state;
    console.log(error);
    return (
      <div>
        <div className="container"> 
          <div className="columns is-paddingless is-marginless"> 
            <div className="column is-5"> 
              <h1 className="title is-1 is-marginless" id="logo"> Ming Newton </h1>
              <h2 className="title is-3" id="subtitle"> Advanced Math Calculator </h2> 
            </div> 
            <div className="column is-3"> 
              <img src=".\logo.png" alt="logo"/>
            </div>
          </div>
          <div className="columns is-marginless is-paddingless">
            <div className="column is-4 is-full-mobile" id="operator">
              {/* Select operator, onChange updates state */}
              <label className="label has-tooltip-left" data-tooltip="Select an operator"> Operator: </label>
              <div className="select"> 
                <Animated>
                  <select onChange={this.onChange} className="is-focused is-large" name="operation" aria-label="Operation Dropdown Menu">
                    <option>Choose operator</option>
                    <option value="simplify">Simplify</option>
                    <option value="factor">Factor</option>
                    <option value="derive">Derive</option>
                    <option value="integrate">Integrate</option>
                    <option value="zeroes">Find 0's</option>
                    <option value="tangent">Find Tangent Line</option>
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
                </Animated>
              </div>
            </div>

            <div className="column is-4 is-full-mobile" id="expression">
              <label className="label"> Expression: </label> 
              {/* Input expression: user types expression, onChange updates state */}
              <input onChange={this.onChange} className="input is-info is-hovered" name="expression" type="text" placeholder="x^2+2x, pi, 0, 1" type="search" placeholder="Search" aria-label="Expression Form"
              />
            </div>
          </div>

          <div className="columns is-mobile is-marginless is-paddingless">
            <div className="results column is-8">
              <div className="row" id="showResults"> 
                {operation === "" && expression === "" ? "" : this.resultWithData()}
              </div>
              <div className="row pt-2" id="table"> 
                <span> <b>Formatting Guide:</b></span>
                <table className="table is-bordered is-striped is-hoverable">
                  <thead> 
                    <tr> 
                      <th> Operator</th>
                      <th> Expression </th>
                      <th> Result </th>
                    </tr>
                  </thead>
                  <tbody> 
                    <tr> 
                      <td>Simplify</td>
                      <td>(x+3)(x+5)</td>
                      <td>x^2+8x+15</td>
                    </tr>
                    <tr> 
                      <td>Factor</td>
                      <td>x^2+8x+15</td>
                      <td>(x+3)(x+5)</td>
                    </tr>
                    <tr> 
                      <td>Derive</td>
                      <td>x^2</td>
                      <td>2x</td>
                    </tr>
                    <tr> 
                      <td>Integrate</td>
                      <td>x^2</td>
                      <td>1/3 x^3</td>
                    </tr>
                    <tr> 
                      <td>Find 0's</td>
                      <td>x^2+2x</td>
                      <td>[-2, 0]</td>
                    </tr>
                    <tr> 
                      <td>Find Tangent Line</td>
                      <td>2 | x^3 <br />x val | f(x) </td>
                      <td>[-2, 0]</td>
                    </tr>
                    <tr> 
                      <td>Cosine</td>
                      <td>pi </td>
                      <td>-1 </td>
                    </tr>
                    <tr> 
                      <td>Sine</td>
                      <td>0 </td>
                      <td>0 </td>
                    </tr>
                    <tr> 
                      <td>Tangent</td>
                      <td>0 </td>
                      <td>0 </td>
                    </tr>
                    <tr> 
                      <td>Arccosine <br/>(Inverse Cosine)</td>
                      <td>-1 </td>
                      <td>pi </td>
                    </tr>
                    <tr> 
                      <td>Arcsine <br/>(Inverse Sine)</td>
                      <td>0 </td>
                      <td>0 </td>
                    </tr>
                    <tr> 
                      <td>Arctangent <br/>(Inverse Tangent)</td>
                      <td>0 </td>
                      <td>0 </td>
                    </tr>
                    <tr> 
                      <td>Absolute Value </td>
                      <td>-1 </td>
                      <td>1 </td>
                    </tr>
                    <tr> 
                      <td>Logarithm </td>
                      <td>2 | 8 <br/>base | arg</td>
                      <td>3 </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  resultWithData(){
    // eslint-disable-next-line
    const { operation, expression, result, error } = this.state
    return(
      operation !== "" && expression === "" ? "Enter an expression to evaluate" : 
      <div>
      {/* results div  */}
      {/* make display results conditional as long as no error */}
      {operation} {' '}
      {expression} <strong> =
      {result} </strong> 
      {/* give user more specific info about error */}
      {/* {error ? error : ""}  */}
      </div>
    )
  }
}

export default App;
