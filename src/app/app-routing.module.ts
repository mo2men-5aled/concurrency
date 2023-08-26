import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { ConcurrencyComponent } from './concurrency/concurrency.component';

const routes: Routes = [
  { path: 'data', component: DataComponent },
  { path: '', component: ConcurrencyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
