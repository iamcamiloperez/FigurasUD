import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { FiguraModule } from './models/figura/figura.module';
import { CapitalizadoPipe } from './pipes/capitalizado.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CapitalizadoPipe
  ],
  imports: [
    BrowserModule,
    FiguraModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
