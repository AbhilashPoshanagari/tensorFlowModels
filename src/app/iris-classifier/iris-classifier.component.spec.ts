import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrisClassifierComponent } from './iris-classifier.component';

describe('IrisClassifierComponent', () => {
  let component: IrisClassifierComponent;
  let fixture: ComponentFixture<IrisClassifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrisClassifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrisClassifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
