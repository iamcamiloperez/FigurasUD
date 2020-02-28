/**
 * Representa las propiedades basicas de una figura
 */
export interface FigureInterface {
    name: string;
    type: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    getArea();
    getPerimeter();
    getProperties();
    getSvgElement();
}

/**
 * Tipos de figuras disponibles
 */
export const TYPE_CIRCLE = 'circle';
export const TYPE_SQUARE = 'square';
export const TYPE_TRIANGLE = 'triangle';
export const TYPE_RECT = 'rect';

/**
 * Valores por defecto
 */
export const SVG_NS = "http://www.w3.org/2000/svg";
export const DEFAULT_FILL = "red";
export const DEFAULT_STROKE = "blue";
export const DEFAULT_STROKE_WIDTH = 2;