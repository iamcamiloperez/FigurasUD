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
 * Representa un circulo
 */
export class CircleModel implements FigureInterface {

  public type: string;
  public name: string;

  constructor(
    public centerX: string | number,
    public centerY: string | number,
    public radio: number,
    public fill?: string,
    public stroke?: string,
    public strokeWidth?: number,
  ) {
    this.type = TYPE_CIRCLE;
    this.name = 'Circulo';

    if (!this.fill) {
      this.fill = DEFAULT_FILL;
    }

    if (!this.stroke) {
      this.stroke = DEFAULT_STROKE;
    }

    if (!this.strokeWidth) {
      this.strokeWidth = DEFAULT_STROKE_WIDTH;
    }
  }

  /**
   * Permite obtener el área
   */
  getArea() {
    Math.PI * Math.pow(this.radio, 2)
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
  getSvgElement() {
    let figure = document.createElementNS(SVG_NS, TYPE_CIRCLE);
    figure = setPropertiesSvgElement(this.getProperties(), figure);
    return figure;
  }

}

/**
 * Representa un cuadrado
 */
export class SquareModel implements FigureInterface {

  public type: string;
  public name: string;
  public centerX: string | number;
  public centerY: string | number;
  public side: number;

  constructor(
    public fill: string,
    public stroke: string,
    public strokeWidth: number,
  ) {
    this.type = TYPE_SQUARE;
    this.name = 'Cuadrado';
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
      x: this.centerX,
      y: this.centerY,
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
  getSvgElement() {
    let figure = document.createElementNS(SVG_NS, TYPE_RECT);
    figure = setPropertiesSvgElement(this.getProperties(), figure);
    return figure;
  }

}

/**
 * Representa un rectangulo
 */
export class RectModel extends SquareModel {

  public type: string;
  public name: string;
  public centerX: string | number;
  public centerY: string | number;
  public width: number;
  public height: number;

  constructor(
    public fill: string,
    public stroke: string,
    public strokeWidth: number,
  ) {
    super(fill, stroke, strokeWidth);
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
  getSvgElement() {
    let figure = document.createElementNS(SVG_NS, TYPE_TRIANGLE);
    figure = setPropertiesSvgElement(this.getProperties(), figure);
    return figure;
  }

}