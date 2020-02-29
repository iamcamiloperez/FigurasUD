import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizado'
})
export class CapitalizadoPipe implements PipeTransform {

  transform(value: string, mayus:boolean = true): string {
    
    value = value.toLowerCase();
    switch (value) {
      case 'square':
        return 'Cuadrado';
      case 'triangle':
        return 'Tirángulo';
      case 'rectangle':
        return 'Rectángulo';
      case 'circle':
        return 'Circulo';
      default:
        return '';
    }
  }

}
