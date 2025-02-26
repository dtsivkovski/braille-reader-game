import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FocusService } from './services/focus.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'braille-game';

  constructor(
    private router: Router,
    private focusService: FocusService
  ) {}

  ngOnInit() {
    // Subscribe to router navigation events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Focus on main content after navigation completes
      this.focusService.setFocus('main-content-focus-target');
    });
  }
}
