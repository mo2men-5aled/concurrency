// ParentComponent TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './concurrency.component.html',
  styleUrls: ['./concurrency.component.css'],
})
export class ConcurrencyComponent {
  isTrue: boolean = true;

  isConvertActive: boolean = true; // Initial form to display

  changeToCompareForm() {
    this.isConvertActive = false;
    this.isTrue = false;
  }
  changeToConvertForm() {
    this.isConvertActive = true;
    this.isTrue = true;
  }
}
