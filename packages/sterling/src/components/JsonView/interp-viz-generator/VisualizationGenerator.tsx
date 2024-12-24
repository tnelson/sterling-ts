import React, { useState } from "react";
import { JsonEntry, VisualizationComponents } from "./ir-expander/ir-expander";
import { DatumParsed } from "@/sterling-connection";

interface VisualizationGeneratorProps {
  datum: DatumParsed<any>;
}

export default function VisualizationGenerator(props : VisualizationGeneratorProps) {
  const [jsonIRString, setJsonIRString] = useState<string>(""); // Holds the user-provided JSON IR
  const [VisualizationComponent, setVisualizationComponent] = useState<JSX.Element | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { datum } = props;
  if (!datum) return null;

  const handleGenerateVisualization = async () => {
    try {
      // Parse the JSON IR
      const jsonIR: JsonEntry[] = JSON.parse(jsonIRString);

      // Generate React components
      if (jsonIRString.length !== 0) {
        const vizComponent = <VisualizationComponents jsonIR={jsonIR} datum={datum} />;
        setVisualizationComponent((prev) => vizComponent);
      }

      setError(null);
    } catch (e) {
      console.error("Error generating visualization:", e);
      setError(`Failed to generate visualization: ${e}`);
    }
  };

  return (
    <div>
      {VisualizationComponent === null && (
        <div>
          <h1>Visualization Generator</h1>

          <textarea
            rows={10}
            cols={50}
            value={jsonIRString}
            onChange={(e) => setJsonIRString(e.target.value)}
            placeholder="Enter JSON IR here..."
            style={{ marginBottom: "1rem", fontFamily: "monospace" }}
          />

          <div>
            <button onClick={handleGenerateVisualization}>
              Generate Visualization
            </button>
          </div>
        </div>
      )}

      {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}

      <div style={{ marginTop: "2rem" }}>{VisualizationComponent}</div>
    </div>
  );
}
