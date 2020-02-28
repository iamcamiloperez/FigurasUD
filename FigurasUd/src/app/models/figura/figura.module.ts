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
  hipotenusa:number;
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
        this.area = (this.base  * this.altura) / 2 ;
        this.hipotenusa = Math.hypot(this.base,this.altura);
        this.diametro = this.base + this.altura + this.hipotenusa;        
        break;
      case 'circulo':
        this.altura = this.base;
        this.area = Math.PI * Math.pow(this.base,2);
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
