import { Icon } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { GoChevronRight } from 'react-icons/go';

interface EvaluatorInputProps {
  disabled: boolean;
  onSubmit: (value: string) => void;
}

const EvaluatorInput = (props: EvaluatorInputProps) => {
  const { disabled, onSubmit } = props;
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSubmit(value);
      setValue('');
    },
    [onSubmit, value]
  );

  const iconColor = disabled ? 'gray.300' : 'gray.500';
  const placeholder = disabled
    ? 'Evaluator disabled'
    : 'Enter an expression...';

  return (
    <div className='absolute inset-x-0 top-0 h-[35px]'>
      <form className='relative block font-mono' onSubmit={handleSubmit}>
        <span className='sr-only'>Search</span>
        <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
          <Icon color={iconColor} as={GoChevronRight} />
        </span>
        <input
          className='h-[35px] text-xs placeholder:italic placeholder:text-gray-400 placeholder:text-xs block bg-white w-full border-b border-gray-100 focus:border-gray-200 py-2 pl-9 pr-3 focus:outline-none'
          placeholder={placeholder}
          type='text'
          disabled={disabled}
          value={value}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export { EvaluatorInput };
