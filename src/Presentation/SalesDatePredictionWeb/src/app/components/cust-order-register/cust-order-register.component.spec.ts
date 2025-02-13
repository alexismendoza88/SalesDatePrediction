import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustOrderRegisterComponent } from './cust-order-register.component';

describe('CustOrderRegisterComponent', () => {
  let component: CustOrderRegisterComponent;
  let fixture: ComponentFixture<CustOrderRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustOrderRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustOrderRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
