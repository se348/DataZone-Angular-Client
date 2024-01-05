// ripple.directive.ts
import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRipple]' // Use this directive on elements to apply the ripple effect
})
export class ButtonInteractionDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const button = this.elementRef.nativeElement;

    // Create ripple element
    const ripple = this.renderer.createElement('span');
    this.renderer.addClass(ripple, 'ripple');

    // Position the ripple and append it to the button
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.renderer.setStyle(ripple, 'top', `${y}px`);
    this.renderer.setStyle(ripple, 'left', `${x}px`);
    this.renderer.appendChild(button, ripple);

    // Remove the ripple element after the animation completes
    setTimeout(() => {
      this.renderer.removeChild(button, ripple);
    }, 2600);
  }
}
