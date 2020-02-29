import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class FiguraModule {
  
  name:string;
  base:number;
  height:number;
  diameter:number;
  hypotenuse:number;
  area:number;
    
  constructor() {
    this.base = 0;
    this.height = 0;
    this.name = "Figura";
  }


  calculate(){
    switch (this.name) {
      case 'square':
        this.height = this.base;
        this.area = this.base  * this.height;
        this.diameter = this.base * 4;
        break;
      case 'triangle':
        this.area = (this.base  * this.height) / 2 ;
        this.hypotenuse = Math.hypot(this.base,this.height);
        this.diameter = this.base + this.height + this.hypotenuse;        
        break;
      case 'circle':
        this.height = this.base;
        this.area = Math.PI * Math.pow(this.base,2);
        this.diameter = this.base * 2;
        break;
      case 'rectangle':
        this.area = this.base  * this.height;
        this.diameter = (this.base * 2) + (this.height * 2);
        break;
    }
  }

  clean(){
    this.name = "";
    this.base = 0;
    this.height = 0;
    this.diameter = 0;
    this.area = 0;  
  }
}
