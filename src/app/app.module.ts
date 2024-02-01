import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { LandingComponent } from './landing/landing.component';
import { ParticlesModule } from 'angular-particle';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditorComponent,
    PreloaderComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ParticlesModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
