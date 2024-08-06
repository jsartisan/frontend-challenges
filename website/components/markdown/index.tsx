/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pre } from "./Pre";
import { Paragraph } from "./Paragraph";

const components = {
  p: Paragraph,
  pre: Pre,
  ul: ({ node, ...props }: any) => <ul className="list-inside list-disc gap-2" {...props} />,
  li: ({ node, ...props }: any) => <li className="leading-normal" {...props} />,
  h3: ({ node, ...props }: any) => <h3 className="text-xl font-bold" {...props} />,
};

export { components };
