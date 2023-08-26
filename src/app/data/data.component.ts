// data.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
})
export class DataComponent implements OnInit {
  fetchedData: any; // You can define the type of your data here

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchData().subscribe(
      (data: any) => {
        this.fetchedData = Object.keys(data.conversion_rates);
        console.log(this.fetchedData);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
