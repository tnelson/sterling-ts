import { connectSterling, disconnectSterling } from '@/sterling-connection';
import { useEffect } from 'react';
import { useSterlingDispatch, useSterlingSelector } from '../state/hooks';
import { selectDrawerIsCollapsed, selectMainView } from '../state/store';
import { AppDrawer } from './AppDrawer/AppDrawer';
import { AppNavBar } from './AppNavBar/AppNavBar';
import { AppSideBar } from './AppSideBar/AppSideBar';
import { AppStage } from './AppStage/AppStage';
import { AppStatusBar } from './AppStatusBar/AppStatusBar';
import { SplitPane } from './SplitPane';

interface SterlingProps {
  url?: string;
}

const Sterling = (props: SterlingProps) => {
  const { url } = props;
  const dispatch = useSterlingDispatch();
  const mainView = useSterlingSelector(selectMainView);
  const isCollapsed = useSterlingSelector(selectDrawerIsCollapsed);

  useEffect(() => {
    dispatch(connectSterling(url));
    return () => {
      dispatch(disconnectSterling());
    };
  }, [url, dispatch]);

  return (
    <>
      <SplitPane
        initialWidth={250}
        isCollapsed={isCollapsed}
        leftComponent={AppDrawer}
        leftPad={30}
        rightComponent={AppStage}
      />
      <AppSideBar />
      <AppNavBar />
      <AppStatusBar />
    </>
  );
};

export { Sterling };
