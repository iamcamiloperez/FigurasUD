import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizado'
})
export class CapitalizadoPipe implements PipeTransform {

  transform(value: string, mayus:boolean = true): string {
    
    value = value.toLowerCase();
    let nombres = value.split(" ");
    let salida:string = "";

    if(mayus){
      for(let i in nombres ){
        nombres[i] = nombres[i][0].toUpperCase() + nombres[i].substr(1);
      }      
    }
    return nombres.join(" ");
  }

}
