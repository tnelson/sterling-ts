import React, { useState, useRef, useEffect } from 'react';
import { ComponentData } from './VizConstructor';

function getComponentDescriber(componentData: ComponentData) {
  switch (componentData.type) {
    case 'text':
      const textProperty = componentData.properties.find(
        (property) => property.name === 'text'
      );
      if (textProperty === undefined) {
        throw new Error('Text component must have a text property');
      }
      return `Text component: ${textProperty.value}`;
    case 'grid':
      const rowsProperty = componentData.properties.find(
        (property) => property.name === 'rows'
      );
      const columnsProperty = componentData.properties.find(
        (property) => property.name === 'columns'
      );
      const heightProperty = componentData.properties.find(
        (property) => property.name === 'height'
      );
      const widthProperty = componentData.properties.find(
        (property) => property.name === 'width'
      );
      if (rowsProperty === undefined || columnsProperty === undefined) {
        throw new Error(
          'Grid component must have rows and columns properties'
        );
      }
      if (heightProperty === undefined || widthProperty === undefined) {
        throw new Error(
          'Grid component must have height and width properties'
        );
      }
      return `Grid component: ${rowsProperty.value} rows, ${columnsProperty.value} columns, ${heightProperty.value} height, ${widthProperty.value} width`;
    default:
      // [TODO] fix this!
      return 'unsupported component data type';
  }
};

interface EditComponentProps {
  componentsData: ComponentData[];
  setComponentsData: React.Dispatch<React.SetStateAction<ComponentData[]>>;
}

export default function EditComponent(props: EditComponentProps) {
  const { componentsData, setComponentsData } = props;
  const [selectedComponentIdx, setSelectedComponentIdx] = useState<
    number | undefined
  >(undefined);
  const [isMoveMode, setIsMoveMode] = useState<boolean>(false);
  const holographicRef = useRef<HTMLDivElement | null>(null);

  const setGlow = (idx: number, glowValue: boolean) => {
    setComponentsData((prev) =>
      prev.map((componentData, i) => {
        if (i === idx) {
          return {
            ...componentData,
            shouldGlow: glowValue
          };
        }
        return componentData;
      })
    );
  };

  const handleSelect = (idx: number) => {
    if (idx === selectedComponentIdx) {
      setSelectedComponentIdx(undefined);
      setGlow(idx, false);
      return undefined;
    }
    setSelectedComponentIdx((prevIdx) => {
      if (prevIdx !== undefined) {
        setGlow(prevIdx, false);
      }
      return idx;
    });
    setGlow(idx, true);
  };

  const handleDelete = () => {
    if (selectedComponentIdx !== undefined) {
      setComponentsData((prev) =>
        prev.filter((_, idx) => idx !== selectedComponentIdx)
      );
      setSelectedComponentIdx(undefined);
    }
  };

  const startMoveMode = () => {
    if (selectedComponentIdx !== undefined) {
      setIsMoveMode(true);

      // Create holographic clone of the selected component
      const node = document.querySelector(`#component-${selectedComponentIdx}`);
      if (node) {
        const clone = node.cloneNode(true) as HTMLDivElement;
        const rect = node.getBoundingClientRect(); // get current position and size
        const offsetX = rect.width / 2;
        const offsetY = rect.height / 2;

        clone.classList.add('moving-clone');
        clone.style.position = 'absolute';
        clone.style.opacity = '0.5';
        clone.style.pointerEvents = 'none';
        clone.style.zIndex = '1000';
        // clone.style.transform = 'translate(-50%, -50%)';
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.left = `${rect.left + window.scrollX}px`;
        clone.style.top = `${rect.top + window.scrollY}px`;

        holographicRef.current = clone;
        document.body.appendChild(clone);

        // save the offsers for later use
        holographicRef.current.dataset.offsetX = `${offsetX}`;
        holographicRef.current.dataset.offsetY = `${offsetY}`;
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isMoveMode || !holographicRef.current) return;

    // const clone = containerRef.current.querySelector('.moving-clone') as HTMLElement;
    // if (clone) {
    //   clone.style.left = `${e.clientX}px`;
    //   clone.style.top = `${e.clientY}px`;
    // }

    const offsetX = parseFloat(holographicRef.current.dataset.offsetX || '0');
    const offsetY = parseFloat(holographicRef.current.dataset.offsetY || '0');

    holographicRef.current.style.left = `${e.clientX - offsetX}px`;
    holographicRef.current.style.top = `${e.clientY - offsetY}px`;
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isMoveMode || selectedComponentIdx === undefined) return;

    const offsetX = parseFloat(holographicRef.current?.dataset.offsetX || '0');
    const offsetY = parseFloat(holographicRef.current?.dataset.offsetY || '0');

    // finalize placement
    const newX = e.clientX - offsetX + window.scrollX;
    // note: 34 is a manual adjustment that was required to make sure the "holographic"
    // component was placed at the same location as the original component
    const newY = e.clientY - offsetY + window.scrollY - 34;

    setComponentsData((prev) => {
      const updatedComponents = [...prev];
      updatedComponents[selectedComponentIdx].properties = updatedComponents[
        selectedComponentIdx
      ].properties.map((property) =>
        property.name === 'topY'
          ? { ...property, value: newY }
          : property.name === 'leftX'
          ? { ...property, value: newX }
          : property
      );
      if (updatedComponents[selectedComponentIdx].type === 'grid') {
        updatedComponents[selectedComponentIdx].properties = 
          updatedComponents[selectedComponentIdx].properties.map((property) => 
            property.name === 'absolutePosition' ? { ...property, value: `${true}` } : property);
        if (updatedComponents[selectedComponentIdx].properties.find((property) => property.name === 'topY') === undefined) {
          updatedComponents[selectedComponentIdx].properties.push({ name: 'topY', type: 'number', value: newY, isStyle: false });
        }
        if (updatedComponents[selectedComponentIdx].properties.find((property) => property.name === 'leftX') === undefined) {
          updatedComponents[selectedComponentIdx].properties.push({ name: 'leftX', type: 'number', value: newX, isStyle: false });
        }
      }
      return updatedComponents;
    });

    // clean up and exit move mode
    // document.querySelector('.moving-clone')?.remove();
    // setIsMoveMode(false);
    holographicRef.current?.remove();
    holographicRef.current = null;
    setIsMoveMode(false);
  };

  useEffect(() => {
    if (isMoveMode) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMoveMode]);

  // const cloneComponent = () => {
  //   if (selectedComponentIdx === undefined || !containerRef.current) return;

  //   const node = document.querySelector(`#component-${selectedComponentIdx}`);
  //   if (node) {
  //     const clone = node.cloneNode(true) as HTMLElement;
  //     clone.classList.add('moving-clone');
  //     clone.style.position = 'absolute';
  //     clone.style.opacity = '0.5';
  //     clone.style.pointerEvents = 'none';
  //     clone.style.left = `${node.getBoundingClientRect().left}px`;
  //     clone.style.top = `${node.getBoundingClientRect().top}px`;
  //     document.body.appendChild(clone);
  //   }
  // };

  // useEffect(() => {
  //   if (isMoveMode) {
  //     cloneComponent();
  //   }
  // }, [isMoveMode]);

  return (
    <div className='py-1 mt-4'>
      <p className='text-lg font-semibold'>Components List</p>
      <ul className='space-y-4'>
        {componentsData.map((componentData, idx) => (
          <li
            key={idx}
            className={`text-sm p-2 rounded cursor-pointer ${
              selectedComponentIdx === idx
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            // onClick={() => setSelectedComponentIdx(idx)}>
            onClick={() => handleSelect(idx)}
          >
            {getComponentDescriber(componentData)}
          </li>
        ))}
      </ul>

      {selectedComponentIdx !== undefined && (
        <div className='mt-4'>
          <p className='text-base font-semibold'>
            Selected: {componentsData[selectedComponentIdx].type}
          </p>
          <div className='text-sm space-x-2'>
            <button
              className='mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
              onClick={handleDelete}
            >
              Delete Component
            </button>
            <button
              className={`mt-2 px-4 py-2 ${
                isMoveMode ? 'bg-blue-500' : 'bg-yellow-500'
              } text-white rounded ${isMoveMode ? "" : "hover:bg-yellow-600"}`}
              onClick={startMoveMode}
            >
              Move Component
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
