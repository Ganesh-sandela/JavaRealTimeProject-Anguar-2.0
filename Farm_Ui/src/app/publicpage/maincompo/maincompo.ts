import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-maincompo',
  imports: [RouterLink, RouterOutlet, Navbar],
  templateUrl: './maincompo.html',
  styleUrl: './maincompo.css',
})
export class Maincompo {}
