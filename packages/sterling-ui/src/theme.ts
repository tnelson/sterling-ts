import { extendTheme } from '@chakra-ui/react';
import { LogoTheme } from './components/Logo';
import { NavBarTheme } from './components/NavBar';
import { NavButtonTheme } from './components/NavButton';
import { SideBarTheme } from './components/SideBar';
import { SideBarButtonTheme } from './components/SideBarButton';
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
    Logo: LogoTheme,
    NavBar: NavBarTheme,
    NavButton: NavButtonTheme,
    SideBar: SideBarTheme,
    SideBarButton: SideBarButtonTheme,
    StatusBar: StatusBarTheme,
    View: ViewTheme
  }
});

export { sterlingTheme };
