import { SIDE_MENU_LAYOUT_DATA_KEY } from './side-menu.config';

export type TSideMenuLayoutRouteData = {
  [SIDE_MENU_LAYOUT_DATA_KEY]?: TSideMenuLayoutData;
};

export type TSideMenuLayoutData = {
  isItem?: boolean;
  icon?: string;
  label?: string;
};
