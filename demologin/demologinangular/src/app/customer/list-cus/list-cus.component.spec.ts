import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCusComponent } from './list-cus.component';

describe('ListCusComponent', () => {
  let component: ListCusComponent;
  let fixture: ComponentFixture<ListCusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
