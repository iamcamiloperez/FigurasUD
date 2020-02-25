import { Component } from '@angular/core';
import { FiguraModule } from './models/figura/figura.module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'FigurasUd';  
  figura:FiguraModule = new FiguraModule();  
  
  
  llenarDatos(value:string){
    this.figura.limpiar();
    this.figura.nombre = value;
  }

  onSubmit(datos:NgForm){    
    this.figura.altura = datos.value["altura"];
    this.figura.base = datos.value["base"];
    this.figura.calcular();
    console.log(this.figura);
  }

}
