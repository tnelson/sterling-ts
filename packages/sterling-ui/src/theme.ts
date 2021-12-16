import { extendTheme } from '@chakra-ui/react';
import { DragHandleTheme } from './components/DragHandle';
import { DrawerTheme } from './components/Drawer';
import { LogoTheme } from './components/Logo';
import { NavBarTheme } from './components/NavBar';
import { NavButtonTheme } from './components/NavButton';
import { SideBarTheme } from './components/SideBar';
import { SideBarButtonTheme } from './components/SideBarButton';
import { StageTheme } from './components/Stage';
import { StatusBarTheme } from './components/StatusBar';
import { ViewTheme } from './components/View';

const sterlingTheme = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
        w: 'full',
        h: 'full',
        overflow: 'hidden'
      }
    }
  },
  components: {
    DragHandle: DragHandleTheme,
    Drawer: DrawerTheme,
    Logo: LogoTheme,
    NavBar: NavBarTheme,
    NavButton: NavButtonTheme,
    SideBar: SideBarTheme,
    SideBarButton: SideBarButtonTheme,
    Stage: StageTheme,
    StatusBar: StatusBarTheme,
    View: ViewTheme
  }
});

export { sterlingTheme };
