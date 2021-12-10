import { connectSterling, disconnectSterling } from '@/sterling-connection';
import { useEffect } from 'react';
import { useSterlingDispatch, useSterlingSelector } from '../state/hooks';
import { selectMainView } from '../state/store';
import { AppNavBar } from './AppNavBar/AppNavBar';
import { AppSideBar } from './AppSideBar/AppSideBar';
import { AppStatusBar } from './AppStatusBar/AppStatusBar';
import { GraphView } from './GraphView/GraphView';
import { ScriptView } from './ScriptView/ScriptView';
import { TableView } from './TableView/TableView';

interface SterlingProps {
  url?: string;
}

const Sterling = (props: SterlingProps) => {
  const { url } = props;
  const dispatch = useSterlingDispatch();
  const mainView = useSterlingSelector(selectMainView);

  useEffect(() => {
    if (url) dispatch(connectSterling(url));
    return () => {
      dispatch(disconnectSterling());
    };
  }, [url, dispatch]);

  return (
    <>
      {mainView === 'GraphView' && <GraphView />}
      {mainView === 'TableView' && <TableView />}
      {mainView === 'ScriptView' && <ScriptView />}
      <AppSideBar />
      <AppNavBar />
      <AppStatusBar />
    </>
  );
};

export { Sterling };
