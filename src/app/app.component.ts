import { Component } from '@angular/core';
import { MainLayout } from '@layouts/main/main.layout';

@Component({
  selector: 'app-root',
  imports: [MainLayout],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
