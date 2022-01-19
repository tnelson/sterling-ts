import { DatumParsed } from '@/sterling-connection';
import { SterlingTheme } from '@/sterling-theme';
import { ProjectionsSection } from './projection/ProjectionsSection';

interface ThemeViewProps {
  datum: DatumParsed<any>;
}

const ThemeView = (props: ThemeViewProps) => {
  const { datum } = props;
  return (
    <div>
      <ProjectionsSection datum={datum} />
    </div>
  );
};

export { ThemeView };
