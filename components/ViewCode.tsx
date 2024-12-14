"use client";

import { Clipboard } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { FormBuilderContext } from "./FormBuilder";
import { generateCode } from "./GenerateCode";
import { Button } from "./ui/button";

const ViewCode = () => {
  const formBuilderState = use(FormBuilderContext);

  if (!formBuilderState) throw new Error("FormBuilderContext is not available");

  const { fields } = formBuilderState;

  const [formattedCode, setFormattedCode] = useState<string>("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedCode);
      toast("Code copied to clipboard.");
    } catch (error) {
      console.error("Failed to copy text:", error);
      toast("Failed to copy code to clipboard.");
    }
  };

  useEffect(() => {
    setFormattedCode(generateCode({ fields }));
  }, [fields]);

  return (
    <>
      <Button
        variant="outline"
        size={"icon"}
        className="absolute top-[3rem] right-6"
        onClick={handleCopy}
        title="Copy code"
      >
        <Clipboard />
      </Button>
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
    </>
  );
};

export default ViewCode;
