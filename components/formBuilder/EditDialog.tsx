import { use, useEffect, useState } from "react";
import { DragItem, FormBuilderContext } from "../FormBuilder";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
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

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {currentField.fieldType} Field</DialogTitle>
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
                onValueChange={(value) =>
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
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
