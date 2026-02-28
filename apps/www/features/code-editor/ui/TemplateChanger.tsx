import type { Challenge, Question, SupportedTemplates } from "~/entities/challenge/model/types";

import { ToggleGroup, Icon, IconProps, ToggleGroupItem } from "~/components/ui";

type TemplateChangerProps = {
  challenge: Challenge;
  template: SupportedTemplates;
  setTemplate: React.Dispatch<React.SetStateAction<SupportedTemplates>>;
};

export function TemplateChanger(props: TemplateChangerProps) {
  const { setTemplate, template } = props;
  const challenge = props.challenge as Question;

  return (
    Object.keys(challenge.templateFiles).length > 1 && (
      <ToggleGroup variant="outline" size="icon">
        {Object.keys(challenge.templateFiles).map((templateKey) => {
          return (
            <ToggleGroupItem
              key={templateKey}
              id={templateKey}
              isSelected={template === templateKey}
              onChange={() => setTemplate(templateKey as SupportedTemplates)}
            >
              <Icon name={`${templateKey}-color` as IconProps["name"]} />
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    )
  );
}
