import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
  {
    path:"",
    component:LandingComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"editor",
    component: EditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
