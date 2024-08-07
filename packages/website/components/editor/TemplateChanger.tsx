import { SUPPORTED_TEMPLATES } from "@frontend-challenges/shared";
import type { SupportedTemplates } from "@frontend-challenges/shared";

import { Select, SelectValue, SelectGroup, SelectItem, SelectTrigger, SelectContent } from "../../components/ui";

type TemplateChangerProps = {
  template: SupportedTemplates;
  setTemplate: (template: SupportedTemplates) => void;
};

const TemplateChanger = (props: TemplateChangerProps) => {
  const { template, setTemplate } = props;

  return (
    <Select
      onValueChange={(value: string) => {
        setTemplate(value as SupportedTemplates);
      }}
      value={template}
      defaultValue="react"
    >
      <SelectTrigger>
        <SelectValue placeholder="Select template" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {SUPPORTED_TEMPLATES.map((template) => (
            <SelectItem key={template} value={template}>
              {template}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { TemplateChanger };
