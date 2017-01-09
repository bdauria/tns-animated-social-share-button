import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";
import { SocialShareButtonComponent } from './social-share-button/social-share-button.component';
import { TNSFontIconModule } from 'nativescript-ng2-fonticon';

import { AppComponent } from "./app.component";
import { LabelShadowDirective } from './label-shadow/label-shadow.directive';

@NgModule({
    declarations: [
      AppComponent,
      SocialShareButtonComponent,
      LabelShadowDirective
    ],
    bootstrap: [AppComponent],
    imports: [
      NativeScriptModule,
      TNSFontIconModule.forRoot({
        'fa': 'font-awesome.css'
      })
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
