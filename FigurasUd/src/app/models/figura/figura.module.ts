import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class FiguraModule {
  
  nombre:string;
  base:number;
  altura:number;
  diametro:number;
  area:number;
  
  
  constructor() {
    this.base = 0;
    this.altura = 0;
    this.nombre = 'rectangulo';
  }

  calcular(){
    switch (this.nombre) {
      case 'cuadrado':
        this.altura = this.base;
        this.area = this.base  * this.altura;
        this.diametro = this.base * 4;
        break;
      case 'triángulo':
        this.altura = this.base;
        this.area = (this.base  * this.altura) / 2 ;
        this.diametro = this.base * 3;
        break;
      case 'circulo':
        this.area = Math.pow(this.base  * 3.14159265359 , 2);
        this.diametro = this.base * 2;
        break;
      case 'rectángulo':
        this.area = this.base  * this.altura;
        this.diametro = (this.base * 2) + (this.altura * 2);
        break;

      default:
        break;
    }
  }

  limpiar(){
    this.nombre = "";
    this.base = 0;
    this.altura = 0;
    this.diametro = 0;
    this.area = 0;  
  }
}
