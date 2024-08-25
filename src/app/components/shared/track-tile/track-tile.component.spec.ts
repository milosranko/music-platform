import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackTileComponent } from './track-tile.component';

describe('TrackTileComponent', () => {
  let component: TrackTileComponent;
  let fixture: ComponentFixture<TrackTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
