import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { ColorSchemeSwitchComponent } from '@shared/components';

@Component({
  selector: 'app-app-bar',
  imports: [Button, Toolbar, ColorSchemeSwitchComponent],
  templateUrl: './app-bar.layout.html',
  styleUrl: './app-bar.layout.css',
})
export class AppBarLayout {}
