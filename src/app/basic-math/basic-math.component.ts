import { Component } from '@angular/core';
import { Question } from '../types/questions';

@Component({
  selector: 'app-basic-math',
  standalone: true,
  imports: [],
  templateUrl: './basic-math.component.html',
  styleUrl: './basic-math.component.scss'
})
export class BasicMathComponent {
  question: Question = this.generateQuestion();
  answer: number = -1;
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
  }

  generateQuestion(): Question {
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
      return this.generateQuestion();
    }

    // generate answer
    this.answer = this.calculateAnswer(num1, operator, num2);


    return {
      num1,
      operator,
      operatorName,
      num2
    }
  }

  // calculate answer
  calculateAnswer(num1: number, operator: string, num2: number): number {
    return -1; // TODO: implement
  }
}
