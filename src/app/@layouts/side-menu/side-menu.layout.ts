import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from 'primeng/menu';
import { SideMenuService } from './side-menu.service';

@Component({
  selector: 'app-side-menu',
  imports: [RouterModule, Menu],
  templateUrl: './side-menu.layout.html',
  styleUrl: './side-menu.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SideMenuService],
})
export class SideMenuLayout {
  /**
   * @description
   * The side menu model.
   * @protected
   */
  protected readonly model = inject(SideMenuService).menuBuilder();
}
