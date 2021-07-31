import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; 

/* import { AppRoutingModule } from './app-routing.module'; */
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { KmeansComponent } from './kmeans/kmeans.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    KmeansComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  exports: [
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
