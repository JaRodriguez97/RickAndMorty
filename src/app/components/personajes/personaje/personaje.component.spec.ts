import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajeComponent } from './personaje.component';

describe('PersonajesComponent', () => {
  let component: PersonajeComponent;
  let fixture: ComponentFixture<PersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonajeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
