import { Question, SupportedTemplates } from "@/types";
import { ToggleGroup, Icon, IconProps, ToggleGroupItem } from "@/components/ui";

type TemplateChangerProps = {
  question: Question;
  template: SupportedTemplates;
  setTemplate: React.Dispatch<React.SetStateAction<SupportedTemplates>>;
};

export function TemplateChanger(props: TemplateChangerProps) {
  const { question, template, setTemplate } = props;

  return (
    Object.keys(question.templateFiles).length > 1 && (
      <ToggleGroup
        variant="outline"
        size="icon"
        type="single"
        value={template}
        onValueChange={(value: string) => {
          setTemplate(value as SupportedTemplates);
        }}
      >
        {Object.keys(question.templateFiles).map((template) => {
          return (
            <ToggleGroupItem key={template} value={template}>
              <Icon name={`${template}-color` as IconProps["name"]} />
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    )
  );
}
