import { DatumParsed } from '@/sterling-connection';
import { SterlingTheme } from '@/sterling-theme';
import { Button, Select } from '@chakra-ui/react';
import { keyBy, keys, merge } from 'lodash';
import { useCallback, useState } from 'react';
import { projectionAdded } from '../../../../state/graphs/graphsSlice';
import {
  useSterlingDispatch,
  useSterlingSelector
} from '../../../../state/hooks';
import { selectAvailableProjectableTypes } from '../../../../state/selectors';

interface AddTimeProjectionMenuProps {
  datum: DatumParsed<any>;
  onSubmit: () => void;
}

const AddTimeProjectionMenu = (props: AddTimeProjectionMenuProps) => {
  const { datum, onSubmit } = props;
  const dispatch = useSterlingDispatch();
  const [type, setType] = useState<string>('');
  const projectables = useSterlingSelector((state) =>
    selectAvailableProjectableTypes(state, datum.id)
  );
  const projectableTypes = keys(projectables);

  const onClick = useCallback(() => {
    const atom = projectables[type][0];
    dispatch(
      projectionAdded({
        datum,
        type,
        atom,
        time: true
      })
    );
    onSubmit();
  }, [datum, type, onSubmit, projectables]);

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
