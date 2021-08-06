import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MachineLearningService } from '../../../services/machine-learning.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-kmeans',
  templateUrl: './kmeans.component.html',
  styleUrls: ['./kmeans.component.scss']
})
export class KmeansComponent implements OnInit {
  page: number;
  form: FormGroup;
  data: any;
  img: any;
  showForm: boolean;
  showResults: boolean;
  constructor(private formbuilder: FormBuilder,
              private machineLearningService:MachineLearningService,
              private _sanitizer: DomSanitizer
    ) {
      this.showForm = true;
      this.showResults = false;
      this.form = this.formbuilder.group({});
      this.page = 1;
  }

  ngOnInit(): void {
    // this.machineLearningService.getData().subscribe((msg:any)=>{
    //   console.log(msg);
    // });
    this.sendData();
  }

  sendData() {
    this.form = this.formbuilder.group({
      query: ['', [Validators.required, Validators.minLength(0)]],
      column_1: ['', [Validators.required, Validators.minLength(0)]],
      column_2: ['', [Validators.required, Validators.minLength(0)]],
      columns: ['', [Validators.required, Validators.minLength(0)]],
      n_clusters: [1, [Validators.required, Validators.min(1)]],
      init: ['', [Validators.required, Validators.minLength(1)]],
      max_iter: [0, [Validators.required, Validators.min(1)]],
    });
  }

  runKmeans(){
    let column_1 = this.form.get('column_1')?.value;
    let column_2 = this.form.get('column_2')?.value;
    let columns= [];
    columns.push(column_1, column_2);
    this.form.controls["columns"].setValue(columns);
    this.machineLearningService.runKmeans(this.form.value).subscribe((result: any)=>{
      // console.log(result)
      this.showResults = true;
      this.data = result;
      this.img = 'data:image/jpg;base64,'
                 + this.data?.graphic;
    }, (err:any)=>{
      alert("Ocurrió un error :(");
    });
  }
}
