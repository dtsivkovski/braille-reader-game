import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-math',
  standalone: true,
  imports: [],
  templateUrl: './basic-math.component.html',
  styleUrl: './basic-math.component.scss'
})
export class BasicMathComponent {
  question = generateQuestion();

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
  }
}

const generateQuestion = () => {
  // define operators and names
  const operators = ['+', '-', '*', '/'];
  const operatorNames = ['plus', 'minus', 'times', 'divided by'];

  // generate random operator and name
  const randomSelect = Math.floor(Math.random() * operators.length);
  const operator = operators[randomSelect];
  const operatorName = operatorNames[randomSelect];

  // generate random numbers
  const num1 = Math.floor(Math.random() * 100);
  const num2 = Math.floor(Math.random() * 100);

  // check for integer division and division by 0
  if (operator === '/' && (num1 % num2 !== 0 || num2 === 0)) {
    return generateQuestion();
  }

  return {
    num1,
    operator,
    operatorName,
    num2
  }
}
