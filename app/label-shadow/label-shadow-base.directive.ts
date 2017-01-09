import { Directive, ElementRef } from '@angular/core';
import { Label } from 'ui/label';
import { Observable } from 'data/observable';
import { Color } from 'color';

@Directive({
  selector: '[shadow]'
})

export abstract class LabelShadowBaseDirective {

  private get label(): Label {
    return this.el.nativeElement;
  }

  protected get shadowColor(): Color {
    return new Color('#888888');
  }

  protected get shadowOffset(): number {
    return 2.0;
  }

  constructor(protected el: ElementRef) {
    this.label.on(Observable.propertyChangeEvent, () => {
      if (this.label.text !== undefined) {
        this.displayShadowOn(this.label);
      }
    });
  }

  protected abstract displayShadowOn(label: Label);
}
