import { SupportedTemplates } from "~/entities/challenge/model/types";
import { SUPPORTED_TEMPLATES } from "~/entities/challenge/model/constants";
import { Select, SelectValue, SelectGroup, SelectItem, SelectTrigger, SelectContent } from "~/components/ui";

type TemplateChangerProps = {
  template: SupportedTemplates;
  setTemplate: (template: SupportedTemplates) => void;
};

const TemplateChanger = (props: TemplateChangerProps) => {
  const { setTemplate, template } = props;

  return (
    <Select
      onValueChange={(value: string) => {
        setTemplate(value as SupportedTemplates);
      }}
      value={template}
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
