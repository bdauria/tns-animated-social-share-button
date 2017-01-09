import { Directive, ElementRef } from '@angular/core';
import { Label } from 'ui/label';
import { Observable } from 'data/observable';
import { LabelShadowBaseDirective } from './label-shadow-base.directive';
import { Color } from 'color';

declare const CGSizeMake: any;

@Directive({
  selector: '[shadow]'
})
export abstract class LabelShadowDirective extends LabelShadowBaseDirective {

  constructor(protected el: ElementRef) {
    super(el);
  }

  protected displayShadowOn(label: Label) {
    const nativeView = label.ios;
    nativeView.layer.shadowColor = this.shadowColor.ios.CGColor;
    nativeView.layer.shadowOffset = CGSizeMake(this.shadowOffset, this.shadowOffset);
    nativeView.layer.shadowOpacity = 1.0;
    nativeView.layer.shadowRadius = 2.0;
  }
}
