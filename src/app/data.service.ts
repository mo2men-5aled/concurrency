import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get(
      'https://concurrency-api.onrender.com/api/v1/currencies'
    );
  }
}
