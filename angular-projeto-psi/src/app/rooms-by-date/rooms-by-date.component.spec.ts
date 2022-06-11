import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsByDateComponent } from './rooms-by-date.component';

describe('RoomsByDateComponent', () => {
  let component: RoomsByDateComponent;
  let fixture: ComponentFixture<RoomsByDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsByDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
