import React, { useState } from 'react';
import {
  ComponentProperty,
  ComponentPropertyInput,
  PropertyValue
} from './ComponentProperties';

interface ComponentFormProps {
  properties: ComponentProperty[];
  initialValues?: Record<string, PropertyValue>;
  onSubmit: (values: Record<string, PropertyValue>) => void;
  onCancel: () => void;
}

export default function ComponentForm(props: ComponentFormProps) {
  const { properties, initialValues = {}, onSubmit, onCancel } = props;

  const [componentPropertyValues, setComponentPropertyValues] =
    useState<Record<string, PropertyValue>>(initialValues);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  // update field values on input change
  const handleInputChange = (name: string, value: PropertyValue) => {
    setComponentPropertyValues((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submission
  const handleSubmit = () => {
    const missingFields = properties.filter(
      (property) => property.required && !componentPropertyValues[property.name]
    );
    if (missingFields.length > 0) {
      setErrorMessage(
        `Please fill in the required fields: ${missingFields
          .map((field) => field.name)
          .join(', ')}`
      );
    } else {
      setErrorMessage(undefined);
      onSubmit(componentPropertyValues);
    }
  };

  return (
    <div>
      <div className='h-[59vh] overflow-y-auto pb-1'>
        <form className='space-y-4 px-1'>
          {properties.map((property) => (
            <div key={property.name}>
              <ComponentPropertyInput
                componentProperty={property}
                value={componentPropertyValues[property.name] || ''}
                onChange={(value) => handleInputChange(property.name, value)}
              />
            </div>
          ))}
        </form>
      </div>

      {errorMessage && (
        <p className='mt-2 text-sm text-red-500'>{errorMessage}</p>
      )}

      <div className='mt-4 flex gap-2'>
        <button onClick={handleSubmit} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
          Save
        </button>
        <button onClick={onCancel} className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'>
          Cancel
        </button>
      </div>
    </div>
  );
}
