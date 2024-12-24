import React from "react";

interface TextStyle {
  textColor?: string;
}

export interface TextDisplayProps {
  text: string;
  topY: number;
  leftX: number;
  textStyle?: TextStyle;
}

export default function TextDisplay(props: TextDisplayProps) {
  const textStyle = props.textStyle ? props.textStyle : {};

  return (
    <div
      style={{
        position: "absolute",
        top: props.topY,
        left: props.leftX,
        color: textStyle.textColor ? textStyle.textColor : "black",
      }}
    >
      {props.text}
    </div>
  );
}
