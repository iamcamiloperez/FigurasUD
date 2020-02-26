import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('canvas', { read: ElementRef, static: true }) private canvas: ElementRef;
  @ViewChild('circulo', { read: ElementRef, static: true }) private circulo: ElementRef;
  @ViewChild('cuadrado', { read: ElementRef, static: true }) private cuadrado: ElementRef;
  @ViewChild('triangulo', { read: ElementRef, static: true }) private triangulo: ElementRef;
  @ViewChild('rectangulo', { read: ElementRef, static: true }) private rectangulo: ElementRef;

  public type: string;
  private area: number;
  private perimetro: number;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      this.initComponents();
    });
  }

  initComponents() {

    let circleDim = this.getDimensions(this.circulo);
    let cuadradoDim = this.getDimensions(this.cuadrado);
    let trianguloDim = this.getDimensions(this.triangulo);
    let rectanguloDim = this.getDimensions(this.rectangulo);

    let properties = {
      cx: 'calc(50%)',
      cy: 'calc(50%)',
      r: 10,
      fill: "red",
      stroke: "blue",
      'stroke-width': 2
    };

    this.draw('circle', properties, this.circulo);
  }

  openModal() {

    let circleDim = this.getDimensions(this.canvas, 20);

    let objeto = {
      cx: 'calc(50%)',
      cy: 'calc(50%)',
      r: circleDim.maxRadio,
      fill: "red",
      stroke: "blue",
      'stroke-width': 2,
      class: 'result'
    };

    this.draw('circle', objeto, this.canvas);

  }

  /**
   * Permite obtener las medidas basicas para realizar los calculos a la hora de dibujar la figura
   * @param element 
   */
  getDimensions(element: ElementRef, margin = 0) {

    console.log('clientHeight', element.nativeElement.height.baseVal.value);
    console.log('clientWidth', element.nativeElement.width);
    console.log('element', element);
    let maxHeight = element.nativeElement.clientHeight - (margin * 2);
    let maxWidth = element.nativeElement.clientWidth - (margin * 2);
    let maxRadio = (maxHeight < maxWidth ? maxHeight : maxWidth) / 2;
    let centroX = (maxWidth + (margin * 2)) / 2 || 0;
    let centroY = (maxHeight + (margin * 2)) / 2 || 0;

    return {
      maxHeight,
      maxWidth,
      maxRadio,
      centroX,
      centroY
    }

  }

  /**
   * Permite establecer las propiedades del elemento
   * @param properties 
   * @param element 
   */
  setProperties(properties: any, element) {
    for (let property in properties) {
      if (properties.hasOwnProperty(property)) {
        element.setAttributeNS(null, property, properties[property]);
      }
    }
    return element;
  }

  /**
   * 
   * @param type 
   */
  setType(type: string) {
    this.type = type;
  }

  /**
   * Permite dibujar una figura
   * @param type 
   * @param properties 
   * @param element 
   */
  draw(type: string, properties: any, element: ElementRef) {
    console.log(type, properties);
    const SVG_NS = "http://www.w3.org/2000/svg";
    let figure = document.createElementNS(SVG_NS, type);
    figure = this.setProperties(properties, figure);
    element.nativeElement.innerHTML = '';
    element.nativeElement.appendChild(figure);
    return figure;
  }

}
