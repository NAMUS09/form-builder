import { FormPlayground } from "../FormPlayground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ViewCode from "../ViewCode";

const FormPreview = () => {
  return (
    <Tabs defaultValue="preview" className="w-full text-center">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div className="md:max-h-[80vh] overflow-auto md:mx-5">
          <FormPlayground />
        </div>
      </TabsContent>
      <TabsContent value="code">
        <div className="md:max-h-[80vh] overflow-auto">
          <ViewCode />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FormPreview;
