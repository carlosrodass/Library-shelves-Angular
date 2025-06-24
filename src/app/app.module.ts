import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

// import {BrowserModule, CommonModule} from '@angular/common';
import { AppComponent } from './app.component';
import { RouterLink, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    AppComponent,
    BrowserModule,
    CommonModule,
    RouterLink,
    RouterModule.forRoot(routes),
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
