import { Data, Route } from '@angular/router';
import { TSideMenuLayoutRouteData } from '@layouts/side-menu';

export type TRouteDataExtended = Data & TSideMenuLayoutRouteData;

export interface IRouteExtended extends Route {
  data?: TRouteDataExtended;
  children?: IRouteExtended[];
}

export type TRoutesExtended = IRouteExtended[];
