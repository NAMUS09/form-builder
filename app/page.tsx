import { FormBuilder } from "@/components/FormBuilder";

export default function Home() {
  return (
    <div className="p-4 min-h-[100svh]">
      <h1 className="text-2xl font-bold mb-4 text-center">Form Builder</h1>
      <FormBuilder />
    </div>
  );
}
