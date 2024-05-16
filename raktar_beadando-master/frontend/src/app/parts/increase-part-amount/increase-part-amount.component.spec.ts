import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreasePartAmountComponent } from './increase-part-amount.component';

describe('IncreasePartAmountComponent', () => {
  let component: IncreasePartAmountComponent;
  let fixture: ComponentFixture<IncreasePartAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncreasePartAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreasePartAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
