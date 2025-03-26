import { Routes } from '@angular/router';
import { BasicMathComponent } from './math-game/basic-math/basic-math.component';
import { HomeComponent } from './home/home.component';
import {CharacterGameComponent} from './character-game/character-game.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'basic-math', component: BasicMathComponent },
  { path: 'character-game', component: CharacterGameComponent }
];
