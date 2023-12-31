import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';

import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { CompareComponent } from './compare/compare.component';
import { ConvertComponent } from './convert/convert.component';
import { ConcurrencyComponent } from './concurrency/concurrency.component';

@NgModule({
  declarations: [
    AppComponent,
    ConcurrencyComponent,
    DataComponent,
    CompareComponent,
    ConvertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
