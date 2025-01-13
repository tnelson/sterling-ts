import React, { useState } from 'react';
import { ComponentType, componentProperties } from './ControlPane';
import {
  ComponentPropertyInput,
  ComponentPropertyValue,
  PropertyValue
} from './ComponentProperties';
import { ComponentData } from './VizConstructor';
import ComponentForm from './ComponentForm';

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

  const handleAddComponent = (
    componentPropertyValues: Record<string, PropertyValue>
  ) => {
    if (!selectedComponentType) return;

    const properties = componentProperties[selectedComponentType];
    const componentPropertyData: ComponentPropertyValue[] = properties.map(
      (property) => ({
        name: property.name,
        type: property.type,
        value: componentPropertyValues[property.name],
        required: property.required,
        isStyle: property.isStyle
      })
    );

    const newComponent: ComponentData = {
      type: selectedComponentType,
      properties: componentPropertyData,
      shouldGlow: false
    };

    setComponentsData((prev) => [...prev, newComponent]);
    setSelectedComponentType(undefined);
  };

  return (
    <div>
      <p className='mt-4 text-base'>
        Choose the type of component you want to add:
      </p>
      <div className='my-2 flex gap-3 justify-center'>
        {Object.values(ComponentType).map((componentType) => (
          <button
            key={componentType}
            onClick={() => setSelectedComponentType(componentType)}
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

      {selectedComponentType ? (
        <ComponentForm
          properties={componentProperties[selectedComponentType]}
          onSubmit={handleAddComponent}
          onCancel={() => setSelectedComponentType(undefined)}
        />
      ) : (
        <p className='mt-10 text-sm text-gray-600'>
          Select a component type to configure its properties
        </p>
      )}
    </div>
  );
}
