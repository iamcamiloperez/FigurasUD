import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CircleModel, SquareModel, RectModel } from 'src/models/figura/figure.model';
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
  private perimeter: number;
  private scale: number;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      this.initComponents();
    });
  }

  initComponents() {

    let circleFigure = new CircleModel(20);
    let squareFigure = new SquareModel(20);
    let rectFigure = new RectModel(3000, 6000);

    this.draw(circleFigure, this.circle);
    this.draw(squareFigure, this.square);
    this.draw(rectFigure, this.triangle);
    this.draw(circleFigure, this.rect);
  }

  openModal() {
    // let figure = new CircleModel(30);
    // let figure = new SquareModel(3000);
    let figure = new RectModel(300, 600);
    let drawResult = this.draw(figure, this.canvas);
    this.area = drawResult.getArea();
    this.perimeter = drawResult.getPerimeter();
    this.scale = drawResult.scale;
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
    parent.nativeElement.appendChild(figure.getSvgElement(parent));
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
