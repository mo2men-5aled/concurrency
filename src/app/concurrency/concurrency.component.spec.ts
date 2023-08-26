import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcurrencyComponent } from './concurrency.component';

describe('ConcurrencyComponent', () => {
  let component: ConcurrencyComponent;
  let fixture: ComponentFixture<ConcurrencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcurrencyComponent]
    });
    fixture = TestBed.createComponent(ConcurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
