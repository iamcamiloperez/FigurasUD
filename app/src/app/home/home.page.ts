import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CircleModel, SquareModel, RectModel, TriangleModel } from 'src/models/figura/figure.model';
import { FigureInterface, TYPE_CIRCLE, TYPE_RECT, TYPE_SQUARE, TYPE_TRIANGLE } from 'src/interfaces/figure.interface';

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
  public area: number;
  public perimeter: number;
  public scale: number;
  public types;

  constructor(platform: Platform) {
    // this.type = TYPE_CIRCLE;
    this.scale = 1;
    this.types = {
      TYPE_CIRCLE,
      TYPE_RECT,
      TYPE_SQUARE,
      TYPE_TRIANGLE,
    };
    platform.ready().then(() => {
      this.initComponents();
    });
  }

  initComponents() {


    setTimeout(() => {
      let circleFigure = new CircleModel(200);
      let squareFigure = new SquareModel(200);
      let rectFigure = new RectModel(3000, 6000);
      let triangleFigure = new TriangleModel(3000, 3000);

      this.draw(circleFigure, this.circle, 2);
      this.draw(squareFigure, this.square, 2);
      this.draw(triangleFigure, this.triangle, 2);
      this.draw(rectFigure, this.rect, 2);

    }, 1000);


  }

  openModal() {

    let figure: FigureInterface;

    switch (this.type) {
      case TYPE_CIRCLE:
        figure = new CircleModel(2000);
        break;
      case TYPE_RECT:
        figure = new RectModel(3000, 600);
        break;
      case TYPE_SQUARE:
        figure = new SquareModel(3000);
        break;
      case TYPE_TRIANGLE:
        figure = new TriangleModel(600, 600);
        break;
    }
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
    this.openModal();
  }

  /**
   * Permite dibujar una figura
   * @param figure 
   * @param parent 
   */
  draw(figure: FigureInterface, parent: ElementRef, margin?: number, clearParent = true) {
    if (clearParent) {
      parent.nativeElement.innerHTML = '';
    }
    parent.nativeElement.appendChild(figure.getSvgElement(parent, margin));
    return figure;
  }

}
