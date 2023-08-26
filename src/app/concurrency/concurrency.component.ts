import { Component } from '@angular/core';
import { DataService } from '../data.service';

import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-concurrency',
  templateUrl: './concurrency.component.html',
  styleUrls: ['./concurrency.component.css'],
})
export class ConcurrencyComponent {
  fetchedData: any; // You can define the type of your data here

  isTrue: boolean = true;
  isDisabled: boolean = true;

  form: FormGroup;

  apiResponse: any; // Declare a variable to hold the API response

  conversion_rates: any = [];

  fromValue: number = 0;
  toValue: number = 0;
  toSelectedCountry: string = '';
  fromSelectedCountry: string = '';

  toflagImagePath: string = '';
  fromflagImagePath: string = '';

  placeholderImagePath = 'assets/flags/placeholder.png';

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      fromISO: '',
      toISO: '',
      amount: '',
      // Add more form controls as needed
    });
  }

  changeToCompare() {
    this.isTrue = false;
    this.isDisabled = true; // Disable the submit button if the form is invalid
  }
  changeToConvert() {
    this.isTrue = true;
    this.isDisabled = true; // Disable the submit button if the form is invalid
    // clear the form
  }

  submitCompareForm(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const formData = this.form.value;

    this.fromValue = this.conversion_rates[formData.fromISO];
    this.toValue = this.conversion_rates[formData.toISO];
  }

  submitConvertForm(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const formData = this.form.value;

    const response = this.http.get(
      `https://v6.exchangerate-api.com/v6/45c0b4d7d900b16539b604c2/pair/${formData.fromISO}/${formData.toISO}/${formData.amount}`
    );

    response.subscribe(
      (data: any) => {
        this.apiResponse = data.conversion_result; // Store the response in the variable
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  updateFromFlagImage() {
    if (this.fromSelectedCountry) {
      this.fromflagImagePath = `assets/flags/${this.fromSelectedCountry}.png`;
    } else {
      this.fromflagImagePath = 'assets/flags/placeholder.png';
    }
  }
  updateToFlagImage() {
    // if image not found error 404 return placeholder image
    if (this.toSelectedCountry) {
      this.toflagImagePath = `assets/flags/${this.toSelectedCountry}.png`;
    } else {
      this.toflagImagePath = 'assets/flags/placeholder.png';
    }
  }

  handleImageError(event: any) {
    event.target.src = this.placeholderImagePath;
  }

  ngOnInit() {
    this.updateFromFlagImage();
    this.updateToFlagImage();

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
