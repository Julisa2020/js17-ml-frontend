import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MachineLearningService } from '../../../services/machine-learning.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kmeans',
  templateUrl: './kmeans.component.html',
  styleUrls: ['./kmeans.component.scss']
})
export class KmeansComponent implements OnInit {
  page: number;
  form: FormGroup;
  response: any;
  data: any;
  columns: any;
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
      query: ["select o.htitulo_cat as categoria,o.htitulo as perfil, w.pagina_web,o.empresa,o.lugar,o.salario,date_part('year',o.fecha_publicacion) as periodo, f_dimPerfilOferta(o.id_oferta,7) as funciones, f_dimPerfilOferta(o.id_oferta,1) as conocimiento, f_dimPerfilOferta(o.id_oferta,3) as habilidades, f_dimPerfilOferta(o.id_oferta,2) as competencias, f_dimPerfilOferta(o.id_oferta,17) as certificaciones, f_dimPuestoEmpleo(o.id_oferta,5) as beneficio, f_dimPerfilOferta(o.id_oferta,11) as formacion from webscraping w inner join oferta o on (w.id_webscraping=o.id_webscraping) where o.id_estado is null limit 500;", [Validators.required, Validators.minLength(0)]],
      // columns: ['', [Validators.required, Validators.minLength(0)]],
      n_clusters: [5, [Validators.required, Validators.min(1)]],
      init: ['', [Validators.required, Validators.minLength(1)]],
      max_iter: [500, [Validators.required, Validators.min(1)]],
      // query: ['', [Validators.required, Validators.minLength(0)]],
      // column_1: ['', [Validators.required, Validators.minLength(0)]],
      // column_2: ['', [Validators.required, Validators.minLength(0)]],
      // columns: ['', [Validators.required, Validators.minLength(0)]],
      // n_clusters: [1, [Validators.required, Validators.min(1)]],
      // init: ['', [Validators.required, Validators.minLength(1)]],
      // max_iter: [0, [Validators.required, Validators.min(1)]],
    });
  }

  runKmeans(){
    Swal.fire({
          title: 'Cargando ...',
          // allowOutsideClick: false
    });
    Swal.showLoading();
    // let column_1 = this.form.get('column_1')?.value;
    // let column_2 = this.form.get('column_2')?.value;
    // let columns= [];
    // columns.push(column_1, column_2);
    // this.form.controls["columns"].setValue(columns);
    this.machineLearningService.runKmeans(this.form.value).subscribe((result: any)=>{
      Swal.close();
      this.showResults = true;
      this.response = result;
      console.log(this.response);
      this.data = result?.data.data;
      this.columns = result?.columns.filter((item:any) => item !== "cluster");
      this.img = 'data:image/jpg;base64,'
                 + this.response?.graphic;
    }, (err:any)=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '!Ocurrió un error!',
      })
    });
  }
}
