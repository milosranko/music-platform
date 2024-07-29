import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMusicComponent } from './home-music.component';

describe('HomeMusicComponent', () => {
  let component: HomeMusicComponent;
  let fixture: ComponentFixture<HomeMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMusicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
