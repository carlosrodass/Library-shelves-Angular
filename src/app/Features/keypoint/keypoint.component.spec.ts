import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypointComponent } from './keypoint.component';

describe('KeypointComponent', () => {
  let component: KeypointComponent;
  let fixture: ComponentFixture<KeypointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeypointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeypointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
