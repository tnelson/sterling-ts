import React, { useState } from 'react';
import {
  ComponentProperty,
  textComponentProperties,
  gridComponentProperties,
  lineComponentProperties,
  arrowComponentProperties
} from './ComponentProperties';
import { ComponentData } from './VizConstructor';
import AddComponent from './AddComponent';
import EditComponent from './EditComponent';
import TextRenamingComponent from './TextRenamingComponent';
import { JsonEntry } from '../interp-viz-generator/ir-expander/ir-expander';
import JsonFileUploader from './JsonFileUploader';

export enum ComponentType {
  GRID = 'grid',
  TEXT = 'text',
  LINE = 'line',
  ARROW = 'arrow',
  CONDITIONAL = 'conditional'
}

// fields associated with each type of component
export const componentProperties: Record<string, ComponentProperty[]> = {
  [ComponentType.GRID]: gridComponentProperties,
  [ComponentType.TEXT]: textComponentProperties,
  [ComponentType.LINE]: lineComponentProperties,
  [ComponentType.ARROW]: arrowComponentProperties,
  [ComponentType.CONDITIONAL]: [] // [TODO]
};

export enum ControlPaneMode {
  ADD = 'Add component',
  EDIT = 'Edit component',
  CONFIGURE_RENAME = 'Configure text renaming',
  UPLOAD_JSON = 'Upload Config JSON'
}

// helper function to download the provided object as a json file
// function downloadJsonFile(jsonIR: JsonEntry[], filename: string = 'vizIR.json') {
function downloadJsonFile(componentData: ComponentData[], filename: string = 'vizIR.json') {
  // IMPORTANT NOTE: as it is right now, the jsonIR does _NOT_ include information
  // about the text renamings that the user sets up, so that will not be included
  // in the file that is saved!
  const jsonString = JSON.stringify(componentData, null, 2);
  // convert JSON string to a Blob
  const blob = new Blob([jsonString], { type: 'application/json' });

  // create a temporary (hidden) anchor element so we can internally click it to
  // trigger the download -- this is kinda hacky; maybe we can find a better way
  // to do this?
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;

  // append the anchor to the body of the DOM, trigger the download, then remove it
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // free up the object URL
  URL.revokeObjectURL(a.href);
}

interface ControlPaneProps {
  // generatedIR: string;
  // setGeneratedIR: React.Dispatch<React.SetStateAction<string>>;
  componentsData: ComponentData[];
  setComponentsData: React.Dispatch<React.SetStateAction<ComponentData[]>>;
  textRenames: [string, string][]; // [original text, replaced text]
  setTextRenames: React.Dispatch<React.SetStateAction<[string, string][]>>;
  // jsonIR: JsonEntry[];
}

export default function ControlPane(props: ControlPaneProps) {
  const {
    componentsData,
    setComponentsData,
    textRenames,
    setTextRenames,
    // jsonIR
  } = props;

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

  const toggleTextRenameMode = (currValue: ControlPaneMode) => {
    if (currValue === ControlPaneMode.CONFIGURE_RENAME) {
      setCurrentMode(ControlPaneMode.ADD);
    } else {
      setCurrentMode(ControlPaneMode.CONFIGURE_RENAME);
    }
  };

  const toggleUploadJsonMode = (currValue: ControlPaneMode) => {
    if (currValue === ControlPaneMode.UPLOAD_JSON) {
      setCurrentMode(ControlPaneMode.ADD);
    } else {
      setCurrentMode(ControlPaneMode.UPLOAD_JSON);
    }
  }

  return (
    <div className='p-1'>
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

      <div className='flex mt-1'>
        <div className='w-1/3'>
          <button
            className={`px-2 py-1 text-xs rounded ${
              currentMode === ControlPaneMode.CONFIGURE_RENAME
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => toggleTextRenameMode(currentMode)}
          >
            Configure text renaming
          </button>
        </div>

        <div className='w-2/3 text-right'>
          <button
            className='px-2 mx-1 py-1 text-xs rounded bg-gray-200 text-gray-800 hover:bg-gray-300'
            onClick={() => downloadJsonFile(componentsData)}
          >
            Save config as JSON
          </button>

          <button
            className='px-2 mx-1 py-1 text-xs rounded bg-gray-200 text-gray-800 hover:bg-gray-300'
            onClick={() => toggleUploadJsonMode(currentMode)}
          >
            Load config JSON
          </button>
        </div>
      </div>

      {/* render the appropriate component */}
      <div className='mt-4'>
        {currentMode === ControlPaneMode.ADD ? (
          <AddComponent setComponentsData={setComponentsData} />
        ) :
        currentMode === ControlPaneMode.EDIT ? (
          <EditComponent
            componentsData={componentsData}
            setComponentsData={setComponentsData}
          />
        ) :
        currentMode === ControlPaneMode.CONFIGURE_RENAME ? (
          <TextRenamingComponent
            textRenames={textRenames}
            setTextRenames={setTextRenames}
          />
        ) : (
          <JsonFileUploader 
            setComponentsData={setComponentsData}
            toggleUploadJsonMode={toggleUploadJsonMode}
          />
        )}
      </div>
    </div>
  );

  // return <AddComponent setComponentsData={setComponentsData} />;
}
