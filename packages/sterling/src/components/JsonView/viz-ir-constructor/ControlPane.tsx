import React, { useState } from 'react';
import {
  ComponentProperty,
  textComponentProperties,
  gridComponentProperties
} from './ComponentProperties';
import { ComponentData } from './VizConstructor';
import AddComponent from './AddComponent';
import EditComponent from './EditComponent';

export enum ComponentType {
  GRID = 'grid',
  TEXT = 'text',
  LINE = 'line',
  CONDITIONAL = 'conditional'
}

// fields associated with each type of component
export const componentProperties: Record<string, ComponentProperty[]> = {
  [ComponentType.GRID]: gridComponentProperties, // [], // [TODO]
  [ComponentType.TEXT]: textComponentProperties,
  [ComponentType.LINE]: [], // [TODO]
  [ComponentType.CONDITIONAL]: [] // [TODO]
};

enum ControlPaneMode {
  ADD = 'Add component',
  EDIT = 'Edit component'
}

interface ControlPaneProps {
  // generatedIR: string;
  // setGeneratedIR: React.Dispatch<React.SetStateAction<string>>;
  componentsData: ComponentData[];
  setComponentsData: React.Dispatch<React.SetStateAction<ComponentData[]>>;
}

export default function ControlPane(props: ControlPaneProps) {
  const { componentsData, setComponentsData } = props;

  // stateful variable to store the mode in which the user currently is
  const [currentMode, setCurrentMode] = useState<ControlPaneMode>(
    ControlPaneMode.ADD
  );

  const toggleMode = () => {
    setCurrentMode((prevMode) =>
      prevMode === ControlPaneMode.ADD
        ? ControlPaneMode.EDIT
        : ControlPaneMode.ADD
    );
  };

  return (
    <div className='p-2'>
      <p className='text-center text-lg'>Control Pane</p>

      {/* toggle switch between modes */}
      <div className='flex items-center justify-end mt-4'>
        <span
          className={`text-xs font-semibold ${
            currentMode === ControlPaneMode.ADD
              ? 'text-blue-500'
              : 'text-gray-500'
          }`}
        >
          {ControlPaneMode.ADD}
        </span>
        <label className='relative mx-4'>
          <input
            type='checkbox'
            className='hidden'
            checked={currentMode === ControlPaneMode.EDIT}
            onChange={toggleMode}
          />
          <div className='w-8 h-4 bg-gray-300 rounded-full cursor-pointer relative'>
            <div
              className={`w-4 h-4 bg-blue-500 rounded-full shadow-md transform transition-transform ${
                currentMode === ControlPaneMode.EDIT ? 'translate-x-4' : ''
              }`}
            ></div>
          </div>
        </label>
        <span
          className={`text-xs font-semibold ${
            currentMode === ControlPaneMode.EDIT
              ? 'text-blue-500'
              : 'text-gray-500'
          }`}
        >
          {ControlPaneMode.EDIT}
        </span>
      </div>

      {/* render the appropriate component */}
      <div className='mt-4'>
        {currentMode === ControlPaneMode.ADD ? (
          <AddComponent setComponentsData={setComponentsData} />
        ) : (
          <EditComponent
            componentsData={componentsData}
            setComponentsData={setComponentsData}
          />
        )}
      </div>
    </div>
  );

  // return <AddComponent setComponentsData={setComponentsData} />;
}
