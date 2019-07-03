import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderstableComponent } from './orderstable.component';

describe('OrderstableComponent', () => {
  let component: OrderstableComponent;
  let fixture: ComponentFixture<OrderstableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderstableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
