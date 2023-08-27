import { Component } from '@angular/core';
import { DataService } from '../data.service';

import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css'],
})
export class ConvertComponent {
  isTrue: boolean = true;
  isDisabled: boolean = true;

  form: FormGroup;

  apiResponse: any; // Declare a variable to hold the API response

  data: any = [];

  fromValue: number = 0;
  toValue: number = 0;
  toSelectedCountry: string = '';
  fromSelectedCountry: string = '';

  toflagImagePath: string = '';
  fromflagImagePath: string = '';

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

  submitForm(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const formData = this.form.value;

    const response = this.http.get(
      `https://concurrency-api.onrender.com/api/v1/currencies/${formData.fromISO}/${formData.toISO}/${formData.amount}`
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
    const image = this.data.find((item: any) => {
      return item.code === this.fromSelectedCountry;
    });

    if (image) {
      this.fromflagImagePath = image.icon_url;
    } else {
      this.fromflagImagePath = 'assets/flags/placeholder.png';
    }
  }
  updateToFlagImage() {
    const image = this.data.find((item: any) => {
      return item.code === this.toSelectedCountry;
    });

    if (image) {
      this.toflagImagePath = image.icon_url;
    } else {
      this.toflagImagePath = 'assets/flags/placeholder.png';
    }
  }

  ngOnInit() {
    this.updateFromFlagImage();
    this.updateToFlagImage();

    this.dataService.fetchData().subscribe(
      (data: any) => {
        this.data = data; // Store the response in the variable
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
