import { IRouteExtended, TRoutesExtended } from '@shared/types';
import { PRIMARY_NAVIGATION } from '@app/app.routes';
import { MenuItem } from 'primeng/api';

/**
 * @class SideMenuService
 * @description
 * Service to build the side menu items.
 */
export class SideMenuService {
  /**
   * @description
   * Build the side menu items from the routes.
   */
  menuBuilder(): MenuItem[] {
    return this.#recursiveBuilder(PRIMARY_NAVIGATION);
  }

  /**
   * @description
   * Recursively build the side menu items.
   * @param items Array of routes
   * @param parentPath Parent path
   * @private
   */
  #recursiveBuilder(items: TRoutesExtended, parentPath = ''): MenuItem[] {
    return items.filter(this.#filterFn).reduce((acc: MenuItem[], route) => this.#reducerFn(acc, route, parentPath), []);
  }

  /**
   * @description
   * Filter the routes to get only the ones that have the side menu data.
   * @param route
   * @private
   */
  #filterFn(route: IRouteExtended): boolean {
    return !!(route.data?.sideMenu?.isItem || route.children);
  }

  /**
   * @description
   * Reducer function to build the side menu items.
   * @param acc Accumulator
   * @param route Route
   * @param parentPath Parent path
   * @private
   */
  #reducerFn(acc: MenuItem[], route: IRouteExtended, parentPath = ''): MenuItem[] {
    if (route.data?.sideMenu?.isItem) {
      acc.push({
        label: route.data?.sideMenu?.label ?? route.title,
        icon: route.data?.sideMenu?.icon,
        expanded: false,
        items: route.children && route.children.length ? this.#recursiveBuilder(route.children, route.path) : undefined,
        routerLink: [parentPath, route.path].join('/'),
      } as MenuItem);
    } else {
      const r = this.#recursiveBuilder(route.children ?? [], route.path);
      acc = [...acc, ...r];
    }
    return acc;
  }
}
