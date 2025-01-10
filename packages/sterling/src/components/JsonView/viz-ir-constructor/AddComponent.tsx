import React, { useState } from 'react';
import { ComponentType, componentProperties } from './ControlPane';
import {
  ComponentPropertyInput,
  ComponentPropertyValue,
  PropertyValue
} from './ComponentProperties';
import { ComponentData } from './VizConstructor';

interface AddComponentProps {
  setComponentsData: React.Dispatch<React.SetStateAction<ComponentData[]>>;
}

export default function AddComponent(props: AddComponentProps) {
  const { setComponentsData } = props;

  // stateful variable to store the type of component the user
  // is currently adding to the canvas
  const [selectedComponentType, setSelectedComponentType] = useState<
    ComponentType | undefined
  >(undefined);

  // stateful variable to store input values for the selected component's properties
  const [componentPropertyValues, setComponentPropertyValues] = useState<
    Record<string, PropertyValue>
  >({});
  // stateful variable to store an error message -- used if the user tries to add a
  // component without filling in all required fields
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  // update state for component property values inputed by the user
  const handleInputChange = (name: string, value: PropertyValue) => {
    setComponentPropertyValues((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submission
  const handleSubmit = () => {
    if (!selectedComponentType) return;

    const properties = componentProperties[selectedComponentType];
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
      console.log('Submitted Data:', componentPropertyValues);
      // [TODO] do something more with the values here
      const componentPropertyData: ComponentPropertyValue[] = properties.map(
        (property) => {
          const value = componentPropertyValues[property.name];
          return {
            name: property.name,
            type: property.type,
            value,
            isStyle: property.isStyle,
          };
        }
      );
      // [TODO] URGENT: this approach puts all the values within `properties`
      // even though some should be in `properties > (grid/text/etc)style`
      const componentData: ComponentData = {
        type: selectedComponentType,
        properties: componentPropertyData,
        shouldGlow: false
      };
      setComponentsData((prev) => [...prev, componentData]);

      // clear the control pane for the user to add additional components if they want to
      setSelectedComponentType(undefined);
      setComponentPropertyValues({});
    }
  };

  return (
    <div>
      {/* buttons for selecting component type */}
      <p className='mt-4 text-base'>
        Choose the type of component you want to add:
      </p>
      <div className='my-2 flex gap-3 justify-center'>
        {Object.values(ComponentType).map((componentType) => (
          <button
            key={componentType}
            onClick={() => {
              setSelectedComponentType(componentType);
              setComponentPropertyValues({});
              setErrorMessage(undefined);
            }}
            className={`px-2 py-1 text-sm rounded ${
              selectedComponentType === componentType
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {componentType}
          </button>
        ))}
      </div>

      {/* form fields for selected component */}
      <div className='py-1 mt-4'>
        {selectedComponentType ? (
          <div>
            <p className='text-base font-semibold'>
              {selectedComponentType} Properties:
            </p>
            <div className='h-[59vh] overflow-y-auto pb-1'>
              <form className='space-y-4 px-1'>
                {componentProperties[selectedComponentType].map((property) => (
                  <div key={property.name}>
                    <ComponentPropertyInput
                      componentProperty={property}
                      value={componentPropertyValues[property.name] || ''}
                      onChange={(value) =>
                        handleInputChange(property.name, value)
                      }
                    />
                  </div>
                ))}
              </form>
            </div>
            <button
              onClick={handleSubmit}
              className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
            >
              Submit
            </button>
            {errorMessage && (
              <p className='mt-2 text-sm text-red-500'>{errorMessage}</p>
            )}
          </div>
        ) : (
          <p className='mt-10 text-sm text-gray-600'>
            Select a component type to configure its properties
          </p>
        )}
      </div>
    </div>
  );
}
