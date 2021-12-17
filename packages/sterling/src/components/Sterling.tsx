import { connectSterling, disconnectSterling } from '@/sterling-connection';
import { Dashboard } from '@/sterling-ui';
import { useEffect } from 'react';
import { useSterlingDispatch, useSterlingSelector } from '../state/hooks';
import { selectDrawerIsCollapsed } from '../state/store';
import { AppDrawer } from './AppDrawer/AppDrawer';
import { AppNavBar } from './AppNavBar/AppNavBar';
import { AppSideBar } from './AppSideBar/AppSideBar';
import { AppStage } from './AppStage/AppStage';
import { AppStatusBar } from './AppStatusBar/AppStatusBar';

interface SterlingProps {
  url?: string;
}

const Sterling = (props: SterlingProps) => {
  const { url } = props;
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
        leftPaneInitialWidth={100}
        leftPaneMinWidth={50}
        rightPaneCollapsed={drawerCollapsed}
        rightPaneInitialWidth={350}
        rightPaneMinWidth={50}
      >
        <div>Left</div>
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
