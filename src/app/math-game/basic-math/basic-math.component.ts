import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Answer } from '../../types/answer';
import { GameSettings } from '../../types/gameSettings';
import { QuestionBounds } from '../../types/questionBounds';
import { Question } from '../../types/questions';
import { LucideAngularModule, ArrowLeft, Settings } from 'lucide-angular';
import { FocusService } from '../../services/focus.service';

@Component({
  selector: 'app-basic-math',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './basic-math.component.html',
  styleUrl: './basic-math.component.scss'
})
export class BasicMathComponent implements OnInit, AfterViewInit {

  // icon for HTML
  readonly ArrowLeftIcon = ArrowLeft;
  readonly SettingsIcon = Settings;

  gameSettings : GameSettings = {
    additionEnabled: true,
    subtractionEnabled: true,
    multiplicationEnabled: true,
    divisionEnabled: true
  }

  // set initial parameters
  questionBounds: QuestionBounds = {
    addition: {
      min_n1: 1,
      max_n1: 100,
      min_n2: 0,
      max_n2: 50
    },
    subtraction: {
      min_n1: 2,
      max_n1: 100,
      min_n2: 0,
      max_n2: 50
    },
    multiplication: {
      min_n1: 0,
      max_n1: 20,
      min_n2: 0,
      max_n2: 10
    },
    division: {
      min_n1: 1,
      max_n1: 100,
      min_n2: 1,
      max_n2: 10
    }
  };
  question: Question = this.generateQuestion();
  currentAnswer: string = '';
  answer: Answer | null = null;
  isOnResult: boolean = false;
  scoreVal: number = 0;
  streakVal: number = 0;

  constructor(private focusService: FocusService) {}

  ngOnInit() {
    // component initialization
  }

  ngAfterViewInit() {
    // Set focus to the heading when component loads
    this.focusService.setFocus('math-game-heading');
    // Announce to screen readers
    this.focusService.announce('Basic Math Game loaded');
  }

  /**
   * Generates a new question and resets the answer and result flags
   */
  nextQuestion(): void {
    if (this.isOnResult) {
      // reset question and UI
      this.question = this.generateQuestion();
      this.isOnResult = false;
      this.resetAudioElements();
    } else {
      const answerInputElement = document.getElementById('answer') as HTMLInputElement;
      if (answerInputElement) {
        this.currentAnswer = answerInputElement.value;
      }
      console.log(this.currentAnswer);
      this.submitAnswer();
    }

    // Set focus to the appropriate element after generating a new question
    if (!this.isOnResult) {
      this.focusService.setFocus('answer'); // set focus to the answer to the question
    } else {
      this.focusService.setFocus('mathPrompt'); // set focus to the math prompt
    }
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
  generateQuestion(type: string | null = null): Question {

    // build operators array based on game settings
    let operators : string[] = [];
    let operatorNames : string[] = [];
    let operatorKeys: string[] = [];
    if (this.gameSettings.additionEnabled) {
      operators.push('+');
      operatorNames.push('plus');
      operatorKeys.push('addition');
    }
    if (this.gameSettings.subtractionEnabled) {
      operators.push('-');
      operatorNames.push('minus');
      operatorKeys.push('subtraction');
    }
    if (this.gameSettings.multiplicationEnabled) {
      operators.push('*');
      operatorNames.push('times');
      operatorKeys.push('multiplication');
    }
    if (this.gameSettings.divisionEnabled) {
      operators.push('/');
      operatorNames.push('divided by');
      operatorKeys.push('division');
    }

    // generate random operator and name
    let operator = operators[Math.floor(Math.random() * operators.length)];
    // if type is provided, use it instead of random operator
    if (type !== null) {
      operator = type;
    }
    let operatorName = operatorNames[operators.indexOf(operator)];
    let operatorKey = operatorKeys[operators.indexOf(operator)];

    // generate random numbers
    let num1: number = 10;
    let num2: number = 10;
    const bounds = this.questionBounds[operatorKey as keyof QuestionBounds]; // bounds as defined in questionBounds
    num1 = Math.floor(
      Math.random() *
      (bounds.max_n1 - bounds.min_n1 + 1)
    ) + bounds.min_n1;
    num2 = Math.floor(
      Math.random() *
      (bounds.max_n2 - bounds.min_n2 + 1)
    ) + bounds.min_n2;

    // check for integer division and division by 0
    while (operator === '/' && (num1 % num2 !== 0 || num2 === 0)) {
      num1 = Math.floor(
        Math.random() *
        (bounds.max_n1 - bounds.min_n1 + 1)
      ) + bounds.min_n1;
      num2 = Math.floor(
        Math.random() *
        (bounds.max_n2 - bounds.min_n2 + 1)
      ) + bounds.min_n2;
    }

    // prevent negatives for subtraction
    while (operator === '-' && num1 < num2) {
      num1 = Math.floor(
        Math.random() *
        (bounds.max_n1 - bounds.min_n1 + 1)
      ) + bounds.min_n1;
      num2 = Math.floor(
        Math.random() *
        (bounds.max_n2 - bounds.min_n2 + 1)
      ) + bounds.min_n2;
    }

    return {
      num1,
      operator,
      operatorName,
      num2
    };
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
  checkAnswer(answerValue: number): Answer {
    const correctAnswer = this.calculateAnswerValue(this.question.num1, this.question.operator, this.question.num2);
    if (answerValue === correctAnswer) {
      // update score values
      this.scoreVal += 1;
      this.streakVal += 1;

      // play audio
      const audio = document.getElementById('correctAudio') as HTMLAudioElement;
      if (audio) {
        audio.play();
      }

      return {
        answer: correctAnswer,
        isCorrect: true
      };
    } else {
      // update streak
      this.streakVal = 0;

      // play audio
      const audio = document.getElementById('incorrectAudio') as HTMLAudioElement;
      if (audio) {
        audio.play();
      }

      // return correct answer
      return {
        answer: correctAnswer,
        isCorrect: false
      };
    }
  }

  /**
   * Resets the audio elements to the beginning and pauses them
   * @description Resets the audio elements for the correct and incorrect sounds to the beginning
   */
  resetAudioElements(): void {
    const correctAudio = document.getElementById('correctAudio') as HTMLAudioElement;
    if (correctAudio) {
      correctAudio.currentTime = 0;
      correctAudio.pause();
    }
    
    const incorrectAudio = document.getElementById('incorrectAudio') as HTMLAudioElement;
    if (incorrectAudio) {
      incorrectAudio.currentTime = 0;
      incorrectAudio.pause();
    }
  }

  toggleSettings(): void {
    // toggles the settings menu
    const settingsMenu = document.getElementById('settingsMenu');
    if (settingsMenu) {
      if (settingsMenu.classList.contains('hidden')) {
        // open settings menu
        settingsMenu.classList.remove('hidden');
        settingsMenu.classList.add('flex');
        settingsMenu.ariaHidden = 'false';
      }
      else {
        // close settings menu and redo question
        settingsMenu.classList.remove('flex');
        settingsMenu.classList.add('hidden');
        settingsMenu.ariaHidden = 'true';
        this.isOnResult = true;
        this.nextQuestion();
      }
    }
  }

}
