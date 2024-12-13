"use client";

export const GenerateCode = ({ fields }: { fields: any[] }) => {
  const generateCode = () => {
    const code = `
import { z } from "zod";

const schema = z.object({
  ${fields
    .map(
      (field) =>
        `${field.name}: z.string()${
          field.validation.required ? ".nonempty()" : ""
        }`
    )
    .join(",\n  ")}
});

export default function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    try {
      schema.parse(formData);
      alert("Form submitted successfully!");
    } catch (error) {
      alert(error.errors.map((err) => err.message).join(", "));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      ${fields
        .map(
          (field) =>
            `<div>
              <label>${field.label}</label>
              <input name="${field.name}" type="text" />
            </div>`
        )
        .join("\n")}
      <button type="submit">Submit</button>
    </form>
  );
}`;
    alert(code);
  };

  return (
    <button
      onClick={generateCode}
      className="p-2 bg-green-500 text-white rounded"
    >
      Generate Code
    </button>
  );
};
