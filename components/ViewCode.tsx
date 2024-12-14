"use client";

import { Highlight, themes } from "prism-react-renderer";
import { use, useEffect, useState } from "react";
import { FormBuilderContext } from "./FormBuilder";
import { generateCode } from "./GenerateCode";

const ViewCode = () => {
  const formBuilderState = use(FormBuilderContext);

  if (!formBuilderState) throw new Error("FormBuilderContext is not available");

  const { fields } = formBuilderState;

  const [formattedCode, setFormattedCode] = useState<string>("");

  useEffect(() => {
    setFormattedCode(generateCode({ fields }));
  }, [fields]);

  return (
    <Highlight
      theme={themes.shadesOfPurple}
      code={formattedCode}
      language="tsx"
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{
            ...style,
            whiteSpace: "pre", // Prevent line wrapping
            overflowX: "auto", // Enable horizontal scrolling
            padding: "1rem",
            textAlign: "left", // Ensure text is aligned to the left
          }}
        >
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line })}
              style={{
                display: "flex",
                alignItems: "flex-start", // Align items to the top
              }}
            >
              <span
                style={{
                  width: "3em", // Fixed width for line numbers
                  textAlign: "right",
                  marginRight: "1em",
                  color: "#888",
                  fontSize: "0.9em",
                  flexShrink: 0, // Prevent shrinking
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  flex: 1,
                  textAlign: "left", // Align the code to the left
                }}
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default ViewCode;
