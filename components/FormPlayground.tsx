"use client";

import { useState } from "react";
import { z } from "zod";

export const FormPlayground = ({ fields }: { fields: any[] }) => {
  const [formData, setFormData] = useState({});
  const schema = z.object(
    fields.reduce((acc, field) => {
      acc[field.name] = field.validation;
      return acc;
    }, {})
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );
    try {
      schema.parse(formValues);
      alert("Form submitted successfully!");
    } catch (error: any) {
      alert(error.errors.map((err: any) => err.message).join(", "));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-1">{field.label}</label>
          <input
            name={field.name}
            type="text"
            className="p-2 border rounded w-full"
            onChange={(e) =>
              setFormData({ ...formData, [field.name]: e.target.value })
            }
          />
        </div>
      ))}
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};
