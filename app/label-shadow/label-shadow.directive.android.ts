import { Directive, ElementRef } from '@angular/core';
import { Label } from 'ui/label';
import { LabelShadowBaseDirective } from './label-shadow-base.directive';
import { Color } from 'color';

@Directive({
  selector: '[shadow]'
})
export class LabelShadowDirective extends LabelShadowBaseDirective {
  constructor(protected el: ElementRef) {
    super(el);
  }

  protected displayShadowOn(label: Label) {
    const nativeView = label.android;
    nativeView.setShadowLayer(
      10.0,
      this.shadowOffset,
      this.shadowOffset,
      this.shadowColor.android
    );
  }
}
