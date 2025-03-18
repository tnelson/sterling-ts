import React from "react";
import { ComponentData } from "./VizConstructor";
import { ControlPaneMode } from "./ControlPane";

interface JsonFileUploaderProps {
  setComponentsData: React.Dispatch<React.SetStateAction<ComponentData[]>>;
  toggleUploadJsonMode: (currValue: ControlPaneMode) => void;
}

export default function JsonFileUploader(props: JsonFileUploaderProps) {

  const { setComponentsData, toggleUploadJsonMode } = props;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // get the (first) uploaded file
    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const json: ComponentData[] = JSON.parse(text) as ComponentData[];
        setComponentsData(json);
      } catch(error) {
        console.error("Error parsing JSON file:", error);
      }
    }

    fileReader.readAsText(file);
    toggleUploadJsonMode(ControlPaneMode.UPLOAD_JSON); // no longer trying to upload a JSON file
  }

  return (
    <div className="p-4">
      <input type="file" accept=".json" onChange={handleFileUpload} />
    </div>
  )
}