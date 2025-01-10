import React from 'react';

type PropertyType = 'string' | 'number' | 'boolean' | 'color' | 'component';

export interface ComponentProperty {
  name: string;
  type: PropertyType;
  required: boolean;
  isStyle: boolean;
}

export type PropertyValue = string | number | boolean | any; // `any` here is for the `component` type

export interface ComponentPropertyValue {
  name: string;
  type: PropertyType;
  value: PropertyValue;
  isStyle: boolean;
}

export const textComponentProperties: ComponentProperty[] = [
  { name: 'text', type: 'string', required: true, isStyle: false },
  { name: 'topY', type: 'number', required: true, isStyle: false },
  { name: 'leftX', type: 'number', required: true, isStyle: false },
  { name: 'textColor', type: 'string', required: false, isStyle: true }
];

export const gridComponentProperties: ComponentProperty[] = [
  { name: 'rows', type: 'number', required: true, isStyle: false },
  { name: 'columns', type: 'number', required: true, isStyle: false },
  { name: 'height', type: 'number', required: true, isStyle: false },
  { name: 'width', type: 'number', required: true, isStyle: false },
  { name: 'absolutePosition', type: 'boolean', required: true, isStyle: false },
  { name: 'topY', type: 'number', required: false, isStyle: false },
  { name: 'leftX', type: 'number', required: false, isStyle: false },
  { name: 'cellText', type: 'string', required: false, isStyle: false },
  { name: 'dashedStroke', type: 'boolean', required: false, isStyle: true },
  { name: 'strokeWidth', type: 'number', required: false, isStyle: true },
  { name: 'strokeColor', type: 'string', required: false, isStyle: true },
  // [TODO] how do we want users to provide cellVisualization and cellDataRelation? 
  // (cellDataRelation is easier since we can just have them enter 2 separate values
  // but the nested component requires some more thought)
];

function getInputType(propertyType: PropertyType) {
  // switch (propertyType) {
  //   case 'string':
  //     return 'text';
  //   case 'number':
  //     return 'number';
  //   case 'boolean':
  //     return 'checkbox';
  //   case 'color':
  //     return 'color';
  //   // [TODO] need to add support for `component` type -- discuss with Tim what the
  //   //        UI/UX for that could be
  //   default:
  //     return 'text';
  // }

  // [NOTE] for now, we are always using text input. even if it is a numerical
  // field, the user might not enter a numerical input; they might enter a forge
  // expression. due to this, we need to allow for a broader set of potential
  // inputs over here.
  // THAT SAID, we do need to think about how we want them to enter inputs
  // for nested components and conditionals.
  return 'text';
}

// interface ComponentPropertyInputProps {
//   componentProperty: ComponentProperty;
// }
interface ComponentPropertyInputProps {
  componentProperty: ComponentProperty;
  value: PropertyValue;
  onChange: (value: PropertyValue) => void;
}

export function ComponentPropertyInput(props: ComponentPropertyInputProps) {
  const { componentProperty, value, onChange } = props;
  const inputType = getInputType(componentProperty.type);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   switch (componentProperty.type) {
  //     case 'string':
  //       return onChange(e.target.value);
  //     case 'number':
  //       return onChange(parseFloat(e.target.value));
  //     case 'boolean':
  //       return onChange(e.target.checked);
  //     case 'color':
  //       return onChange(e.target.value);
  //     default:
  //       return;
  //   }
  // };

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        {componentProperty.name}
        <span className='text-red-500'>
          {componentProperty.required ? '*' : ''}
        </span>
      </label>
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // onChange={handleChange}
        className='w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
        placeholder={`Enter ${componentProperty.name}`}
      />
    </div>
  );
}
