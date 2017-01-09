import { Component } from "@angular/core";
import * as dialogs from 'ui/dialogs';

@Component({
  selector: "my-app",
  templateUrl: "app.component.html",
  styleUrls: ['app.component.css']
})
export class AppComponent {
  public get shareIcons(): Array<string> {
    return ['facebook', 'twitter', 'linkedin', 'github', 'tumblr'];
  }

  public onShareButtonTap(event: string): void {
    dialogs.alert(`share on: ${event}`);
  }
}
