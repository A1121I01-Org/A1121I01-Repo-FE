import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookByCategoryComponent } from './list-book-by-category.component';

describe('ListBookByCategoryComponent', () => {
  let component: ListBookByCategoryComponent;
  let fixture: ComponentFixture<ListBookByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBookByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
