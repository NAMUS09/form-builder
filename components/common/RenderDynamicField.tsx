import { DragItem } from "../FormBuilder";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type RenderDynamicFieldProps = {
  field: DragItem;
};

const RenderDynamicField: React.FC<RenderDynamicFieldProps> = ({ field }) => {
  if (field.fieldType === "Input") {
    return (
      <>
        <Label htmlFor={field.name}>{field.label}</Label>
        <Input
          id={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
        />
      </>
    );
  }

  return null;
};

export default RenderDynamicField;
