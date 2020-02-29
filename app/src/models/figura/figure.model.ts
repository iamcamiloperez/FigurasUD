import {
  FigureInterface,
  TYPE_CIRCLE,
  TYPE_SQUARE,
  TYPE_RECT,
  TYPE_TRIANGLE,
  SVG_NS,
  DEFAULT_FILL,
  DEFAULT_STROKE,
  DEFAULT_STROKE_WIDTH
} from '../../interfaces/figure.interface';
import { ElementRef } from '@angular/core';

/**
 * Permite establecer las propiedades del elemento
 * @param properties 
 * @param element 
 */
export function setPropertiesSvgElement(properties: any, element) {
  for (let property in properties) {
    if (properties.hasOwnProperty(property)) {
      element.setAttributeNS(null, property, properties[property]);
    }
  }
  return element;
}


/**
 * Permite obtener las medidas basicas para realizar los calculos a la hora de dibujar la figura
 * @param element 
 */
export function getDimensions(element: ElementRef, margin = 10) {

  console.log('clientHeight', element.nativeElement.height.baseVal.value);
  console.log('clientWidth', element.nativeElement.width);
  console.log('element', element);
  let maxHeight = element.nativeElement.clientHeight - (margin * 2);
  let height = element.nativeElement.clientHeight;
  let maxWidth = element.nativeElement.clientWidth - (margin * 2);
  let width = element.nativeElement.clientWidth;
  let maxRadio = ((maxHeight < maxWidth ? maxHeight : maxWidth) / 2) - margin;
  let maxSide = (maxHeight < maxWidth ? maxHeight : maxWidth) - (margin * 2);
  let centroX = (maxWidth + (margin * 2)) / 2 || 0;
  let centroY = (maxHeight + (margin * 2)) / 2 || 0;

  return {
    maxHeight,
    maxWidth,
    maxRadio,
    maxSide,
    centroX,
    centroY,
    margin,
    height,
    width
  }

}

/**
 * Representa un circulo
 */
export class CircleModel implements FigureInterface {

  public type: string;
  public name: string;
  public scale: number;

  constructor(
    public radio: number,
    public centerX?: string | number,
    public centerY?: string | number,
    public fill?: string,
    public stroke?: string,
    public strokeWidth?: number,
  ) {
    this.type = TYPE_CIRCLE;
    this.name = 'Circulo';
    this.scale = 1;

    if (!this.fill) {
      this.fill = DEFAULT_FILL;
    }

    if (!this.stroke) {
      this.stroke = DEFAULT_STROKE;
    }

    if (!this.strokeWidth) {
      this.strokeWidth = DEFAULT_STROKE_WIDTH;
    }

    if (!this.centerX) {
      this.centerX = 'calc(50%)';
    }

    if (!this.centerY) {
      this.centerY = 'calc(50%)';
    }
  }

  /**
   * Permite obtener el área
   */
  getArea() {
    return Math.PI * Math.pow(this.radio, 2)
  }

  /**
   * Permite obtener el perímetro
   */
  getPerimeter() {
    return 2 * Math.PI * this.radio;
  }

  /**
   * Permite obtener las propiedades del elemento a dibujar
   */
  getProperties() {
    return {
      cx: this.centerX,
      cy: this.centerY,
      r: this.radio,
      fill: this.fill,
      stroke: this.stroke,
      'stroke-width': this.strokeWidth
    };
  }

  /**
   * Permite obtener el elemento a dibujar en el SVG
   */
  getSvgElement(svgParent?: ElementRef) {
    if (svgParent) {
      this.scaleFigure(svgParent);
    }
    let figure = document.createElementNS(SVG_NS, TYPE_CIRCLE);
    figure = setPropertiesSvgElement(this.getProperties(), figure);
    return figure;
  }

  /**
   * 
   * @param svgParent 
   */
  scaleFigure(svgParent?: ElementRef) {
    let dimensions = getDimensions(svgParent);
    if (this.radio > dimensions.maxRadio) {
      this.radio = dimensions.maxRadio;
      this.scale = this.radio / dimensions.maxRadio
    }
  }

}

/**
 * Representa un cuadrado
 */
export class SquareModel implements FigureInterface {

  public type: string;
  public name: string;
  public scale: number;

  constructor(
    public side: number,
    public x?: string | number,
    public y?: string | number,
    public fill?: string,
    public stroke?: string,
    public strokeWidth?: number,
  ) {
    this.type = TYPE_SQUARE;
    this.name = 'Cuadrado';
    this.scale = 1;

    if (!this.fill) {
      this.fill = DEFAULT_FILL;
    }

    if (!this.stroke) {
      this.stroke = DEFAULT_STROKE;
    }

    if (!this.strokeWidth) {
      this.strokeWidth = DEFAULT_STROKE_WIDTH;
    }
    if (!this.x) {
      this.x = 0;
    }
    if (!this.y) {
      this.y = 0;
    }
  }

  /**
   * Permite obtener el área
   */
  getArea() {
    return Math.pow(this.side, 2);
  }

  /**
   * Permite obtener el perímetro
   */
  getPerimeter() {
    return this.side * 4;
  }

  /**
   * Permite obtener las propiedades del elemento a dibujar
   */
  getProperties() {
    return {
      x: this.x,
      y: this.y,
      width: this.side,
      height: this.side,
      fill: this.fill,
      stroke: this.stroke,
      'stroke-width': this.strokeWidth
    };
  }

  /**
   * Permite obtener el elemento a dibujar en el SVG
   */
  getSvgElement(svgParent?: ElementRef) {
    if (svgParent) {
      this.scaleFigure(svgParent);
    }
    let figure = document.createElementNS(SVG_NS, TYPE_RECT);
    figure = setPropertiesSvgElement(this.getProperties(), figure);
    return figure;
  }

  /**
   * 
   * @param svgParent 
   */
  scaleFigure(svgParent?: ElementRef) {
    let dimensions = getDimensions(svgParent);
    if (this.side > dimensions.maxSide) {
      this.side = dimensions.maxSide;
      this.scale = this.side / dimensions.maxSide;
    }

    this.x = (dimensions.width - this.side) / 2;
    this.y = (dimensions.height - this.side) / 2;

  }

}

/**
 * Representa un rectangulo
 */
export class RectModel extends SquareModel {

  public type: string;
  public name: string;

  constructor(
    public centerX: string | number,
    public centerY: string | number,
    public width: number,
    public height: number,
    public fill: string,
    public stroke: string,
    public strokeWidth: number,
  ) {
    super(width, centerX, centerY, fill, stroke, strokeWidth);
    this.type = TYPE_SQUARE;
    this.name = 'Rectangulo';
  }

  /**
   * Permite obtener el área
   */
  getArea() {
    return this.height * this.width;
  }

  /**
   * Permite obtener el perímetro
   */
  getPerimeter() {
    return (this.width * 2) + (this.height * 2);
  }

  /**
   * Permite obtener las propiedades del elemento a dibujar
   */
  getProperties() {
    return {
      x: this.centerX,
      y: this.centerY,
      width: this.width,
      height: this.height,
      fill: this.fill,
      stroke: this.stroke,
      'stroke-width': this.strokeWidth
    };
  }

}

/**
 * Representa un triangulo
 */
export class TriangleModel implements FigureInterface {

  public type: string;
  public name: string;
  public centerX: string | number;
  public centerY: string | number;

  constructor(
    public width: number,
    public height: number,
    public fill: string,
    public stroke: string,
    public strokeWidth: number,
  ) {
    this.type = TYPE_TRIANGLE;
    this.name = 'Triangulo';
  }

  /**
   * Permite obtener el área
   */
  getArea() {
    return 0;
  }

  /**
   * Permite obtener el perímetro
   */
  getPerimeter() {
    return 0;
  }

  /**
   * Permite obtener las propiedades del elemento a dibujar
   */
  getProperties() {
    return {
      points: "100,10 190,190 10,190",
      fill: this.fill,
      stroke: this.stroke,
      'stroke-width': this.strokeWidth
    };
  }

  /**
   * Permite obtener el elemento a dibujar en el SVG
   */
  getSvgElement(svgParent?: ElementRef) {
    let figure = document.createElementNS(SVG_NS, TYPE_TRIANGLE);
    figure = setPropertiesSvgElement(this.getProperties(), figure);
    return figure;
  }

  /**
   * 
   * @param svgParent 
   */
  scaleFigure(svgParent?: ElementRef) {
  }

}