import { SupportedTemplates } from "~/entities/challenge/model/types";
import { SUPPORTED_TEMPLATES } from "~/entities/challenge/model/constants";
import { Select, SelectItem } from "~/components/ui/select";

type TemplateChangerProps = {
  template: SupportedTemplates;
  setTemplate: (template: SupportedTemplates) => void;
};

const TemplateChanger = (props: TemplateChangerProps) => {
  const { setTemplate, template } = props;

  return (
    <Select
      selectedKey={template}
      onSelectionChange={(key) => {
        setTemplate(key as SupportedTemplates);
      }}
      placeholder="Select template"
    >
      {SUPPORTED_TEMPLATES.map((template) => (
        <SelectItem key={template} id={template}>
          {template}
        </SelectItem>
      ))}
    </Select>
  );
};

export { TemplateChanger };
