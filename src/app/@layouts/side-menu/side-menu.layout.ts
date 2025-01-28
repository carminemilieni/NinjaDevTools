import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-menu',
  imports: [RouterModule, Menu],
  templateUrl: './side-menu.layout.html',
  styleUrl: './side-menu.layout.scss',
})
export class SideMenuLayout {
  protected readonly items: MenuItem[] = [
    {
      icon: 'pi pi-fw pi-home',
    },
  ];
}
