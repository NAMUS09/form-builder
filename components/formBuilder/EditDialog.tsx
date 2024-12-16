import { DragItem, InputType } from "@/lib/interface";
import clsx from "clsx";
import { use, useEffect, useState } from "react";
import { FormBuilderContext } from "../FormBuilder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type EditDialogProps = {
  selectedField: DragItem | null;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditDialog: React.FC<EditDialogProps> = ({
  selectedField,
  isEditDialogOpen,
  setIsEditDialogOpen,
}) => {
  const formBuilderState = use(FormBuilderContext);

  if (!formBuilderState) throw new Error("FormBuilderContext is not available");

  const { setFields } = formBuilderState;

  const [currentField, setCurrentField] = useState<DragItem | null>(null);
  const [customValidation, setCustomValidation] = useState(
    !!currentField?.validation.regex ? "regex" : ""
  );
  const [regexMessage, setRegexMessage] = useState<string | null>(null);
  const [regexError, setRegexError] = useState(false);

  const handleSave = () => {
    setIsEditDialogOpen(false);
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === currentField?.id ? currentField : field
      )
    );
  };

  useEffect(() => {
    setCurrentField(selectedField);
  }, [selectedField]);

  if (!currentField) return null;

  const handleValueChange = (value: string) => {
    if (!value) {
      setCurrentField({
        ...currentField,
        validation: {
          ...currentField.validation,
          regex: null,
          regexMessage: null,
        },
      });
    }
    setCustomValidation(value);
  };

  const handleRegexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regexValue = e.target.value;

    try {
      // Try to create a new RegExp to validate the regex
      new RegExp(regexValue);
      setRegexError(false);
      setRegexMessage("Regex is valid"); // No error if valid
      setCurrentField({
        ...currentField,
        validation: {
          ...currentField.validation,
          regex: regexValue,
          regexMessage: null,
        },
      });
    } catch {
      setRegexError(true);
      setRegexMessage("Invalid regular expression"); // Set error if invalid
    }
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {currentField.fieldType} Field</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={currentField.label}
            onChange={(e) =>
              setCurrentField({ ...currentField, label: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={currentField.name}
            onChange={(e) =>
              setCurrentField({ ...currentField, name: e.target.value })
            }
          />
        </div>
        {currentField.fieldType === "Input" && (
          <>
            <div>
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={currentField.placeholder}
                onChange={(e) =>
                  setCurrentField({
                    ...currentField,
                    placeholder: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={currentField.type}
                onValueChange={(value: InputType) =>
                  setCurrentField({ ...currentField, type: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="password">Password</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div className="flex gap-2">
          <div className="flex p-2 border-2 items-center gap-2 rounded">
            <Checkbox
              id="required"
              checked={currentField.validation.required}
              onCheckedChange={(checkedState) =>
                setCurrentField({
                  ...currentField,
                  validation: {
                    ...currentField.validation,
                    required: checkedState as boolean,
                  },
                })
              }
            />
            <Label htmlFor="required">Required</Label>
          </div>

          <div className="flex p-2 border-2 items-center gap-2 rounded">
            <Checkbox
              id="disabled"
              checked={currentField.validation.disabled}
              onCheckedChange={(checkedState) =>
                setCurrentField({
                  ...currentField,
                  validation: {
                    ...currentField.validation,
                    disabled: checkedState as boolean,
                  },
                })
              }
            />
            <Label htmlFor="disabled">Disabled</Label>
          </div>
        </div>

        {currentField.validation.required && (
          <div>
            <Label htmlFor="requiredMessage">Required Message</Label>
            <Input
              id="requiredMessage"
              value={currentField.validation.requiredMessage}
              onChange={(e) =>
                setCurrentField({
                  ...currentField,
                  validation: {
                    ...currentField.validation,
                    requiredMessage: e.target.value,
                  },
                })
              }
            />
          </div>
        )}

        <Accordion
          type="single"
          collapsible
          value={customValidation}
          onValueChange={handleValueChange}
        >
          <AccordionItem value="regex">
            <AccordionTrigger>Add custom validation?</AccordionTrigger>
            <AccordionContent>
              <div className="p-1">
                {/* custom regex */}
                <Label htmlFor="regex">Regex</Label>
                <Input
                  id="regex"
                  value={currentField.validation?.regex ?? ""}
                  onChange={handleRegexChange}
                />

                {!!regexMessage && currentField.validation?.regex && (
                  <p
                    className={clsx(
                      "text-sm",
                      regexError ? "text-red-500" : "text-green-500"
                    )}
                  >
                    {regexMessage}
                  </p>
                )}

                <Label htmlFor="regex">Regex Message</Label>
                <Input
                  id="regexMessage"
                  value={currentField.validation?.regexMessage ?? ""}
                  onChange={(e) =>
                    setCurrentField({
                      ...currentField,
                      validation: {
                        ...currentField.validation,
                        regexMessage: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
