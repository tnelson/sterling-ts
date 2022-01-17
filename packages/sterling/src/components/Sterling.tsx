import { connectSterling, disconnectSterling } from '@/sterling-connection';
import { Dashboard } from '@/sterling-ui';
import { useEffect } from 'react';
import { useSterlingDispatch, useSterlingSelector } from '../statenew/hooks';
import { selectDrawerIsCollapsed } from '../statenew/selectors';
import { AppDrawer } from './AppDrawer/AppDrawer';
import { AppNavBar } from './AppNavBar/AppNavBar';
import { AppSideBar } from './AppSideBar/AppSideBar';
import { AppStage } from './AppStage/AppStage';
import { AppStatusBar } from './AppStatusBar/AppStatusBar';
import { defaultPreferences } from '../preferences';
import { DataExplorer } from './DataExplorer/DataExplorer';

interface SterlingProps {
  url?: string;
}

const Sterling = (props: SterlingProps) => {
  const { url } = props;
  const { layout } = defaultPreferences;
  const dispatch = useSterlingDispatch();
  const drawerCollapsed = useSterlingSelector(selectDrawerIsCollapsed);

  useEffect(() => {
    dispatch(connectSterling(url));
    return () => {
      dispatch(disconnectSterling());
    };
  }, [url, dispatch]);

  return (
    <>
      <Dashboard
        leftPaneCollapsed={false}
        leftPaneInitialWidth={layout.explorerWidth}
        leftPaneMinWidth={layout.explorerMinWidth}
        leftPaneMaxWidth={layout.explorerMaxWidth}
        rightPaneCollapsed={drawerCollapsed}
        rightPaneInitialWidth={layout.drawerWidth}
        rightPaneMinWidth={layout.drawerMinWidth}
        rightPaneMaxWidth={layout.drawerMaxWidth}
      >
        <DataExplorer />
        <AppStage />
        <AppDrawer />
      </Dashboard>
      <AppSideBar />
      <AppNavBar />
      <AppStatusBar />
    </>
  );
};

export { Sterling };
