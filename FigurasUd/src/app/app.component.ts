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
  anchoFigura:string = "0px";
  altoFigura:string = "0px";
  
  
  llenarDatos(value:string){
    this.figura.clean();
    this.figura.name = value;
    this.anchoFigura = "0px";
    this.altoFigura = "0px";
  }

  onSubmit(datos:NgForm){    
    this.figura.height = datos.value["height"];
    this.figura.base = datos.value["base"];
    this.figura.calculate();
    this.anchoFigura = this.figura.base + 'px';
    this.altoFigura = this.figura.height + 'px';
    
    if(this.figura.base > 270){
      let b = this.figura.base;
      let h = this.figura.height;          
      h = (h*270/b);
      b = 270;
      if(this.figura.name == 'triangle'){
        h = h/2;
        b = b/2;
      }    
      this.altoFigura = h.toString() +'px';
      this.anchoFigura = b.toString()+'px';
    }    
  }

}
