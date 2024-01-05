import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';


interface ProgressStatusComponentState {
    inprogress: boolean;
  }
  
  const initProgressStatusComponentState: Partial<ProgressStatusComponentState> =
    {
      inprogress: false,
    };
  

@Component({
  selector: 'custom-spinner',
  templateUrl: './spinner-dotted.component.html',
  styleUrls: ['./spinner-dotted.component.css'],
  providers:[RxState]
})
export class CustomSpinnerComponent {

  constructor(
  ) {
    this.scale();
  }

  color = '#000000';
  enabled = true;
  size: number | string = 5;
  speed = 100;
  still = false;
  styles = {};
  thickness = 10;

  get svgStyle() {
    return {
      color: this.color,
      overflow: 'visible',
      width: this.normalizeSize(this.size),
      height: this.normalizeSize(this.size),
      ...(typeof this.styles === 'string'
        ? JSON.parse(this.styles)
        : this.styles),
    };
  }
  normalizeSize(size: number | string) {
    parseFloat(size.toString()).toString() === size.toString()
      ? `${size}px`
      : size.toString();
  }

  coords = [
    { x: 22, y: -20 },
    { x: 29, y: 0 },
    { x: 22, y: 20 },
    { x: 0, y: 30 },
    { x: -23, y: 20 },
    { x: -30, y: 0 },
    { x: -23, y: -20 },
    { x: 0, y: -30 },
  ];
   scaleFactor = 0.25;
   scale(){
       this.coords =  this.coords.map(point => ({
          x: point.x * this.scaleFactor,
          y: point.y * this.scaleFactor
      }));
   }
  get duration() {
    return 200 / this.speed;
  }
  circleStyle(i: number) {
    return  {
      transform: `translate(${this.coords[i].x}px, ${this.coords[i].y}px)`,
      'animation-delay': `${(this.duration / 20 ) * i}s `,
          }
    };
  }

