import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembeshipsComponent } from './membeships.component';

describe('MembeshipsComponent', () => {
  let component: MembeshipsComponent;
  let fixture: ComponentFixture<MembeshipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembeshipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembeshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
