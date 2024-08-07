import React from "react";
import Markdown from "react-markdown";

import { components } from "../../../components/mdx";
import { Badge, BadgeProps, Card } from "../../../components/ui";

type DescriptionProps = {
  form: any;
};

function Description(props: DescriptionProps) {
  const { form } = props;

  return (
    <Card className="p-3">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{form.getValues("title")}</h1>
        <div className="flex gap-2">
          <Badge variant={form.getValues("difficulty") as BadgeProps["variant"]}>{form.getValues("difficulty")}</Badge>
        </div>
        <Markdown components={components} className="pt-2">
          {form.getValues("readme")}
        </Markdown>
      </div>
    </Card>
  );
}

export { Description };
