import { Component } from '@angular/core';
import { DataService } from '../data.service';

import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
})
export class CompareComponent {
  fetchedData: any; // You can define the type of your data here

  isTrue: boolean = true;
  isDisabled: boolean = true;

  form: FormGroup;

  apiResponse: any; // Declare a variable to hold the API response

  conversion_rates: any = [];

  fromValue: number = 0;
  toValue: number = 0;
  target1SelectedCountry: string = '';
  target2SelectedCountry: string = '';
  fromSelectedCountry: string = '';

  target1ImagePath: string = '';
  target2ImagePath: string = '';
  fromflagImagePath: string = '';

  placeholderImagePath = 'assets/flags/placeholder.png';

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      fromISO: '',
      amount: '',
      target1SelectedCountry: '',
      target2SelectedCountry: '',
      // Add more form controls as needed
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const formData = this.form.value;

    this.fromValue = this.conversion_rates[formData.fromISO];
    this.toValue = this.conversion_rates[formData.toISO];
  }

  updateFromFlagImage() {
    if (this.fromSelectedCountry) {
      this.fromflagImagePath = `assets/flags/${this.fromSelectedCountry}.png`;
    } else {
      this.fromflagImagePath = 'assets/flags/placeholder.png';
    }
  }
  updateTarget1Image() {
    // if image not found error 404 return placeholder image
    if (this.target1SelectedCountry) {
      this.target1ImagePath = `assets/flags/${this.target1SelectedCountry}.png`;
    } else {
      this.target1ImagePath = 'assets/flags/placeholder.png';
    }
  }
  updateTarget2Image() {
    // if image not found error 404 return placeholder image
    if (this.target2SelectedCountry) {
      this.target2ImagePath = `assets/flags/${this.target2SelectedCountry}.png`;
    } else {
      this.target2ImagePath = 'assets/flags/placeholder.png';
    }

    console.log(this.target2ImagePath);
    console.log(this.target2SelectedCountry);
  }

  handleImageError(event: any) {
    event.target.src = this.placeholderImagePath;
  }

  ngOnInit() {
    this.updateFromFlagImage();
    this.updateTarget1Image();
    this.updateTarget2Image();

    this.dataService.fetchData().subscribe(
      (data: any) => {
        this.fetchedData = Object.keys(data.conversion_rates);

        this.conversion_rates = data.conversion_rates; // Store the response in the variable
        console.log(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    console.log(this.conversion_rates);
  }
}
