import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CircleModel } from 'src/models/figura/figure.model';
import { FigureInterface } from 'src/interfaces/figure.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('canvas', { read: ElementRef, static: true }) private canvas: ElementRef;
  @ViewChild('circle', { read: ElementRef, static: true }) private circle: ElementRef;
  @ViewChild('square', { read: ElementRef, static: true }) private square: ElementRef;
  @ViewChild('triangle', { read: ElementRef, static: true }) private triangle: ElementRef;
  @ViewChild('rect', { read: ElementRef, static: true }) private rect: ElementRef;

  public type: string;
  private area: number;
  private perimetro: number;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      this.initComponents();
    });
  }

  initComponents() {

    let circleDim = this.getDimensions(this.circle);
    let squareDim = this.getDimensions(this.square);
    let triangleDim = this.getDimensions(this.triangle);
    let rectDim = this.getDimensions(this.rect);

    let circleFigure = new CircleModel('calc(50%)', 'calc(50%)', 20/*circleDim.maxRadio*/);

    this.draw(circleFigure, this.circle);
    this.draw(circleFigure, this.square);
    this.draw(circleFigure, this.triangle);
    this.draw(circleFigure, this.rect);
  }

  openModal() {

    let circleDim = this.getDimensions(this.canvas, 20);
    let figure = new CircleModel('calc(50%)', 'calc(50%)', circleDim.maxRadio);
    this.draw(figure, this.canvas);

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
   * Permite establecer el tipo de figura a dibujar
   * @param type 
   */
  setType(type: string) {
    this.type = type;
  }

  /**
   * Permite dibujar una figura
   * @param figure 
   * @param parent 
   */
  draw(figure: FigureInterface, parent: ElementRef, clearParent = true) {
    if (clearParent) {
      parent.nativeElement.innerHTML = '';
    }
    parent.nativeElement.appendChild(figure);
    return figure;
  }


  /***********************************************
  title = 'FigurasUd';
  figura: FigureModel = new FigureModel();
  anchoFigura: string = "0px";
  altoFigura: string = "0px";


  llenarDatos(value: string) {
    this.figura.limpiar();
    this.figura.nombre = value;
    this.anchoFigura = "0px";
    this.altoFigura = "0px";
  }

  onSubmit(datos: NgForm) {
    this.figura.altura = datos.value["altura"];
    this.figura.base = datos.value["base"];
    this.figura.calcular();
    this.anchoFigura = this.figura.base + 'px';
    this.altoFigura = this.figura.altura + 'px';

    if (this.figura.base > 270) {
      let b = this.figura.base;
      let h = this.figura.altura;
      h = (h * 270 / b);
      b = 270;
      if (this.figura.nombre == 'triángulo') {
        h = h / 2;
        b = b / 2;
      }
      this.altoFigura = h.toString() + 'px';
      this.anchoFigura = b.toString() + 'px';
      console.log(this.anchoFigura);
      console.log(this.altoFigura);
    }
  }
  /***********************************************/





}
