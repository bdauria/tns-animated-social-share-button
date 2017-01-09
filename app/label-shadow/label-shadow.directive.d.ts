import { Label } from 'ui/label';
import { LabelShadowBaseDirective } from './label-shadow-base.directive';

export declare class LabelShadowDirective extends LabelShadowBaseDirective {
  constructor(label: Label);
  protected displayShadowOn(label: Label);
}
