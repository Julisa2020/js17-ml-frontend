import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MachineLearningService {
  readonly URL = 'https://js17-ml-backend.herokuapp.com';
  // readonly URL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getAlgorithms(){ return this.http.get(this.URL + '/algorithms'); }

  runKmeans(form: any) {
    return this.http.post(this.URL+ '/kmeans', form);
  }

}
