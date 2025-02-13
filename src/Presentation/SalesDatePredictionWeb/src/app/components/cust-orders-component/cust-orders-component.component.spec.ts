import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustOrdersComponentComponent } from './cust-orders-component.component';

describe('CustOrdersComponentComponent', () => {
  let component: CustOrdersComponentComponent;
  let fixture: ComponentFixture<CustOrdersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustOrdersComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustOrdersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
