import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverySignupComponent } from './recovery-signup.component';

describe('RecoverySignupComponent', () => {
  let component: RecoverySignupComponent;
  let fixture: ComponentFixture<RecoverySignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverySignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverySignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
