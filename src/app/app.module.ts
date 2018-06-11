import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { AppRoutingModule } from './app-routing.module';
import { TasksModule } from './tasks/tasks.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TasksModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2IziToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
