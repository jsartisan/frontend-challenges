import { Question, Challenge, SupportedTemplates } from "@/shared";
import { ToggleGroup, Icon, IconProps, ToggleGroupItem } from "@/web/components/ui";

type TemplateChangerProps = {
  challenge: Challenge;
  template: SupportedTemplates;
  setTemplate: React.Dispatch<React.SetStateAction<SupportedTemplates>>;
};

export function TemplateChanger(props: TemplateChangerProps) {
  const { template, setTemplate } = props;
  const challenge = props.challenge as Question;

  return (
    Object.keys(challenge.templateFiles).length > 1 && (
      <ToggleGroup
        variant="outline"
        size="icon"
        type="single"
        value={template}
        onValueChange={(value: string) => {
          setTemplate(value as SupportedTemplates);
        }}
      >
        {Object.keys(challenge.templateFiles).map((template) => {
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
