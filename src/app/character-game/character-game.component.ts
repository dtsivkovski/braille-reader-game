import {Component} from '@angular/core';
import {ArrowLeft, LucideAngularModule, Settings} from "lucide-angular";
import {CharacterGameSettings} from './types/gameSettings';
import {CharacterGameQuestion} from './types/question';
import CharacterGameQuestionTypes from './types/questionTypes';

@Component({
  selector: 'app-character-game',
  standalone: true,
    imports: [
        LucideAngularModule
    ],
  templateUrl: './character-game.component.html',
  styleUrl: './character-game.component.scss'
})
export class CharacterGameComponent {

  // icon for HTML
  readonly ArrowLeftIcon = ArrowLeft;
  readonly SettingsIcon = Settings;

  // game settings
  gameSettings : CharacterGameSettings = {
    lettersEnabled: true,
    numbersEnabled: false,
  }

  scoreVal: number = 0;
  streakVal: number = 0;
  question: CharacterGameQuestion = {
    character: "a"
  };
  isOnResult: boolean = false;
  isCorrect: boolean = false;
  currentAnswer: string = "";

  ngOnInit() {
    // component initialization
    this.nextQuestion();
  }

  ngAfterViewInit() {
    // TODO: Set focus to the heading when component loads and announce to screen readers
    // this.focusService.setFocus('character-game-heading');
    // this.focusService.announce('Character Typing Game loaded');
  }

  //TODO: Implement Game Question Generation Logic
  nextQuestion() : void {
    const CGQT = CharacterGameQuestionTypes; // redefine for shorter definition
    let questionTypes: CharacterGameQuestionTypes[] = [];
    // push question types to array
    if (this.gameSettings.lettersEnabled) { questionTypes.push(CGQT.letters); }
    if (this.gameSettings.numbersEnabled) { questionTypes.push(CGQT.numbers); }

    // generate question type
    let questionType: CharacterGameQuestionTypes = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    switch (questionType) {
      case CGQT.letters:
        this.generateLetterQuestion();
        break;
      case CGQT.numbers:
        //TODO: generate a number question
        break;
      default:
        break;
    }
    this.isOnResult = false;

  }

  generateLetterQuestion() : void {
    const letterVal = Math.floor(Math.random() * 26) + 97; // randomly generates a value from 97 to 122
    this.question.character = String.fromCharCode(letterVal);
  }

  //TODO: Implement Game Question Submission Logic
  submitAnswer() : void {

  }

  //TODO: Add TTS to speak the necessary character out loud
  //TODO: Implement focus service


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
        //TODO: Redo question upon settings closed
      }
    }
  }

}
