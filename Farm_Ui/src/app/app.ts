import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Maincompo } from "./publicpage/maincompo/maincompo";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Maincompo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Farm_Ui');
}
