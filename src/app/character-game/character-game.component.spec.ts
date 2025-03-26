import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterGameComponent } from './character-game.component';

describe('CharacterGameComponent', () => {
  let component: CharacterGameComponent;
  let fixture: ComponentFixture<CharacterGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
