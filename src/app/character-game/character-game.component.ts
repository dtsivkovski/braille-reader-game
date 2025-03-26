import { Component } from '@angular/core';
import {ArrowLeft, LucideAngularModule, Settings} from "lucide-angular";
import {CharacterGameSettings} from './types/gameSettings';
import {CharacterGameQuestion} from './types/question';

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
    numbersEnabled: true,
  }

  scoreVal: number = 0;
  streakVal: number = 0;
  question: CharacterGameQuestion = {
    character: "a"
  };
  isOnResult: boolean = false;
  isCorrect: boolean = false;
  currentAnswer: string = "";

  //TODO: Implement Game Question Generation Logic
  nextQuestion() : void {

  }

  //TODO: Implement Game Question Submission Logic
  submitAnswer() : void {

  }

  //TODO: Add TTS to speak the necessary character out loud



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
