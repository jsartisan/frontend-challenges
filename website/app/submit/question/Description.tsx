import { Badge, BadgeProps, Card } from "@/website/components/ui";

import React from "react";
import { components } from "../../../components/mdx";
import Markdown from "react-markdown";

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
