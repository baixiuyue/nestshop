import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditroleComponent } from './addeditrole.component';

describe('AddeditroleComponent', () => {
  let component: AddeditroleComponent;
  let fixture: ComponentFixture<AddeditroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
