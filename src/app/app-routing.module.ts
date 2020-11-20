import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IrisClassifierComponent } from './iris-classifier/iris-classifier.component';

const routes: Routes = [{
  path: 'iris',
  component: IrisClassifierComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
