import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppStore } from '@data/stores';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main.layout.html',
  styleUrl: './main.layout.scss',
  imports: [ButtonModule, JsonPipe],
})
export class MainLayout {
  protected readonly store = inject(AppStore);
}
