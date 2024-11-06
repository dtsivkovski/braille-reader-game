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
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  return {
    num1,
    operator,
    num2
  }
}
