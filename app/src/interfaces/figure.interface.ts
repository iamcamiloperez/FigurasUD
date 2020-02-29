import { ElementRef } from '@angular/core';

/**
 * Representa las propiedades basicas de una figura
 */
export interface FigureInterface {
    name: string;
    type: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    scale?: number;
    getArea(): number;
    getPerimeter(): number;
    getProperties();
    getSvgElement(svgParent?: ElementRef, margin?: number);
    scaleFigure(svgParent?: ElementRef, margin?: number);
}

/**
 * Tipos de figuras disponibles
 */
export const TYPE_CIRCLE = 'circle';
export const TYPE_SQUARE = 'square';
export const TYPE_TRIANGLE = 'polygon';
export const TYPE_RECT = 'rect';

/**
 * Valores por defecto
 */
export const SVG_NS = "http://www.w3.org/2000/svg";
export const DEFAULT_FILL = "#d7d8da";
export const DEFAULT_STROKE = "#d7d8da";
export const DEFAULT_STROKE_WIDTH = 1;