import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogedInContainerComponent } from './loged-in-container.component';

describe('LogedInContainerComponent', () => {
  let component: LogedInContainerComponent;
  let fixture: ComponentFixture<LogedInContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogedInContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogedInContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
