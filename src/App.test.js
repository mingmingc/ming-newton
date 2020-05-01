import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { className } from 'postcss-selector-parser';
import { empty } from 'rxjs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('result div is blank when operation & expression are not defined', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);

  expect(div.querySelector(".results").textContent).toBe("")
});

//try Enzyme
it('result div prompts for expression when expression is blank', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  const selector = div.querySelector("[name = 'operation']");
  selector.value = 'derive'; //future: list all operators & loop thru & run this test for each
  selector.dispatchEvent(new Event("select"))
  expect(div.querySelector(".results").textContent).toContain("Enter an expression to derive")
});

it('displays result in array for zeroes', () => {
  const div = document.createElement('div');
  
});

