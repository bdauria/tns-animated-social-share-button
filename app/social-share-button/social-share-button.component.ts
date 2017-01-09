import { 
  Component,
  Input,
  QueryList,
  ViewChildren,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';
import { TNSFontIconModule } from 'nativescript-ng2-fonticon';
import { Label } from 'ui/label';
import { Color } from 'color';
import { range } from 'lodash';
import { Animation, Pair, AnimationPromise } from 'ui/animation';
import { GridLayout } from 'ui/layouts/grid-layout';

enum AnimationState {
  idle,
  animating,
  settled
}

@Component({
  selector: 'social-share-button',
  templateUrl: 'social-share-button/social-share-button.component.html',
  styleUrls: ['social-share-button/social-share-button.component.css']
})
export class SocialShareButtonComponent implements OnInit {

  private animationState = AnimationState.idle;

  @Input('buttonColor') buttonColor = '#CC0000';
  @Input('iconColor') iconColor = '#FFFFFF';
  @Input('size') size = 75;
  @Input('shareIcons') shareIcons: Array<string>;
  @Output('shareButtonTap') shareButtonTap = new EventEmitter<string>();
  @ViewChildren('shareButton') shareButtonRefs: QueryList<ElementRef>;


  private get shareButtons(): Array<GridLayout> {
    return this.shareButtonRefs.map(s => s.nativeElement);
  }

  public get mainIconSize(): number {
    return this.size * 0.45;
  }

  public get shareButtonSize(): number {
    return this.size * 0.55;
  }

  public get shareIconSize(): number {
    return this.shareButtonSize * 0.5;
  }

  private get circularRotationRadius(): number {
    return this.size * 0.8;
  }

  public get viewHeight(): number {
    return this.size + this.shareButtonSize * 1.2;
  }

  public get viewWidth(): number {
    return this.size + this.shareButtonSize * 2.5;
  }

  constructor(private fonticon: TNSFontIconModule) {}

  public ngOnInit() {
    if (!this.shareIcons || this.shareIcons.length === 0) {
      throw new Error('you need to specify at least 1 icon');
    }
    if (this.shareIcons.length > 5) {
      throw new Error('the list of icons cannot contain more than 5 elements');
    }
  }

  public onMainButtonTap(): void {
    if (this.animationState == AnimationState.idle) {
      this.translateShareButtonsOutOfMainButton().then(() => {
        this.animationState = AnimationState.animating;
        return this.rotateShareButtonsAroundMainButton();
      }).then(() => { 
       this.animationState = AnimationState.settled;
      });
    }
    if (this.animationState == AnimationState.settled) {
      this.translateShareButtonsBackInMainButton().then(() => { 
        this.animationState = AnimationState.idle; 
      });
    }
  }

  private translateShareButtonsOutOfMainButton(): AnimationPromise {
    return this.translateShareButtonsTo({
      x: this.circularRotationRadius,
      y: 0
    })
  }

  private translateShareButtonsBackInMainButton(): AnimationPromise {
    return this.translateShareButtonsTo({ x: 0, y: 0 });
  }

  private translateShareButtonsTo(coordinates: Pair): AnimationPromise {
    const animationDefinitions = this.shareButtons.map(button => {
      return {
        target: button,
        translate: coordinates,
        duration: 200
      };
    });
    const animation = new Animation(animationDefinitions);
    return animation.play();
  }

  private rotateShareButtonsAroundMainButton(): AnimationPromise {
    const animationPromises = this.shareButtons.map((button, index) => {
      return this.rotateAroundMainButton(button, index);
    });
    return <AnimationPromise>Promise.all(animationPromises);
  }

  private rotateAroundMainButton(button: GridLayout, index: number): AnimationPromise {
    const maxAngle = this.maxAngleFor(index);
    return this.angleIntervals(maxAngle).reduce(
      this.getStepRotationAccumulatorFor(button),Promise.resolve()
    );
  }

  private getStepRotationAccumulatorFor(button: GridLayout) {
    return (accumulator, currentAngle, index) => {
      return accumulator.then(() => this.doStepRotation(button, currentAngle));
    }
  }

  private doStepRotation(button: GridLayout, angle: number): AnimationPromise {
    return button.animate({
      translate: this.buttonCoordinatesFor(angle),
      duration: 0.8
    });
  }

  public onShareButtonTap(icon: string): void {
    this.shareButtonTap.emit(icon);
  }

  private maxAngleFor(index: number): number {
    return index * 45;
  }

  private angleIntervals(maxAngle: number): Array<number> {
    const step = 5;
    return range(0, maxAngle + step, step);
  }

  private buttonCoordinatesFor(angle: number): Pair {
    const radius = this.size * 0.80;
    const x = radius * Math.cos(angle * Math.PI / 180);
    const y = radius * Math.sin(angle * Math.PI / 180);

    return { x: x, y: y };
  }
}
