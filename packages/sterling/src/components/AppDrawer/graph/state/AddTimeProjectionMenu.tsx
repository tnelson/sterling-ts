import { AlloyRelation, AlloyType } from '@/alloy-instance';
import { DatumParsed } from '@/sterling-connection';
import { SterlingTheme } from '@/sterling-theme';
import { Button, Select } from '@chakra-ui/react';
import { keyBy, keys, merge } from 'lodash';
import { useCallback, useState } from 'react';
import {
  useSterlingDispatch,
  useSterlingSelector
} from '../../../../statenew/hooks';
import { selectProjectableTypes } from '../../../../statenew/selectors';
import { themeChanged } from '../../../../statenew/theme/themeSlice';

interface AddTimeProjectionMenuProps {
  datum: DatumParsed<any>;
  theme: SterlingTheme;
  onSubmit: () => void;
}

const AddTimeProjectionMenu = (props: AddTimeProjectionMenuProps) => {
  const { datum, theme, onSubmit } = props;
  const dispatch = useSterlingDispatch();
  const [type, setType] = useState<string>('');
  const projectables = useSterlingSelector((state) =>
    selectProjectableTypes(state, datum.id)
  );
  const projectableTypes = keys(projectables);

  const onClick = useCallback(() => {
    const atom = projectables[type][0];
    const projections = theme.projections || [];
    dispatch(
      themeChanged({
        datum,
        theme: {
          ...theme,
          projections: [...projections, { type, atom, time: true }]
        }
      })
    );
    onSubmit();
  }, [datum, theme, type, onSubmit, projectables]);

  return (
    <div className='p-2 flex flex-col'>
      <Select
        className='mb-2'
        size='sm'
        placeholder='Select Time Signature'
        onChange={(event) => setType(event.target.value)}
      >
        {projectableTypes.map((type, index) => {
          return (
            <option key={index} value={type}>
              {type}
            </option>
          );
        })}
      </Select>
      <Button size='sm' onClick={onClick}>
        OK
      </Button>
    </div>
  );
};

export { AddTimeProjectionMenu };
