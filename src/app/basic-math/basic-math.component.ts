import { Component } from '@angular/core';
import { Question } from '../types/questions';
import { Answer } from '../types/answer';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
@Component({
  selector: 'app-basic-math',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './basic-math.component.html',
  styleUrl: './basic-math.component.scss'
})
export class BasicMathComponent {

  // icon
  readonly ArrowLeftIcon = ArrowLeft;

  question: Question = this.generateQuestion();
  currentAnswer: string = '';
  answer: Answer | null = null;
  isOnResult: boolean = false;

  /**
   * Handles the input change event from the user
   * @param event The input event from the user
   * @description Extracts the numeric value from the input event and updates the current answer to be used for submission
   */
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.currentAnswer = value;
  }

  /**
   * Generates a new question and resets the answer and result flags
   */
  nextQuestion(): void {
    this.question = this.generateQuestion();
    this.isOnResult = false;
  }

  /**
   * Submits the user's answer from input update and checks if it is correct
   */
  submitAnswer(): void {
    const parsedAnswer = parseInt(this.currentAnswer);
    if (isNaN(parsedAnswer)) {
      // Handle invalid input
      return;
    }
    this.answer = this.checkAnswer(parsedAnswer);
    this.isOnResult = true;
  }

  /**
   * Generates a random question with a correct answer
   * @returns A question object containing the numbers and operator
   */
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

    return {
      num1,
      operator,
      operatorName,
      num2
    }
  }

  /**
   * Calculates the correct answer for the given question
   * @param num1 The first number in the question
   * @param operator The operator in the question
   * @param num2 The second number in the question
   * @returns The correct answer for the question as an Answer object
   */
  calculateAnswerValue(num1: number, operator: string, num2: number): number {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
      default:
        throw new Error('Invalid operator');
    }
  }

  /**
   * Checks if the provided answer matches the correct answer
   * @param answerValue The numeric value provided by the user
   * @description Compares the user's answer with the stored correct answer and updates
   * the isCorrect flag accordingly. The answer object must exist before calling this method.
   */
  checkAnswer(answerValue: number) : Answer {
    const correctAnswer = this.calculateAnswerValue(this.question.num1, this.question.operator, this.question.num2);
    if (answerValue === correctAnswer) {
      return {
        answer: correctAnswer,
        isCorrect: true
      }
    } else {
      return {
        answer: correctAnswer,
        isCorrect: false
      }
    }
  }
}
