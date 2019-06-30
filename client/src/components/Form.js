import React from "react";

function Form(props) {
    return (
        <div className="level-item"> 
        <p className="control is-expanded"> 
          <input className="input is-info is-fullwidth" type="text" placeholder="Enter what you want to calculate" />
        </p>
      </div>
    );
}

export default Form;