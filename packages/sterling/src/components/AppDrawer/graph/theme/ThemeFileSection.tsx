import { DatumParsed } from '@/sterling-connection';
import { ChangeEvent } from 'react';
import {
  saveThemeRequested,
  themeFileLoaded
} from '../../../../state/graphs/graphsSlice';
import { useSterlingDispatch } from '../../../../state/hooks';

interface ThemeFileSectionProps {
  datum: DatumParsed<any>;
}

const ThemeFileSection = (props: ThemeFileSectionProps) => {
  const { datum } = props;
  const dispatch = useSterlingDispatch();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      file.text().then((text) => {
        dispatch(
          themeFileLoaded({
            datum,
            data: text
          })
        );
      });
    }
  };

  return (
    <form className='flex items-center space-x-2 px-2 py-1 bg-slate-100 border-b'>
      <label
        className='block text-xs font-semibold border-0 rounded-md bg-slate-100 text-slate-900 px-4 py-1 shrink-0 transition hover:bg-slate-300 cursor-pointer'
        onClick={() => {
          dispatch(
            saveThemeRequested({
              datum
            })
          );
        }}
      >
        Save As...
      </label>
      <label className='block grow'>
        <span className='sr-only'>Choose a theme file.</span>
        <input
          type='file'
          className='block w-full text-xs text-slate-500 file:mr-2 file:bg-slate-100 hover:file:bg-slate-300 file:transition file:text-slate-900 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:cursor-pointer'
          onChange={onChange}
        />
      </label>
    </form>
  );
};

export { ThemeFileSection };
