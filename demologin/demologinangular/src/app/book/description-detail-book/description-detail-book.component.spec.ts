import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionDetailBookComponent } from './description-detail-book.component';

describe('DescriptionDetailBookComponent', () => {
  let component: DescriptionDetailBookComponent;
  let fixture: ComponentFixture<DescriptionDetailBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionDetailBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionDetailBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
