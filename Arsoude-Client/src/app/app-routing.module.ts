import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HikeCreationComponent } from './hike-creation/hike-creation.component';

const routes: Routes = [
  {path: 'hikecreation', component: HikeCreationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
