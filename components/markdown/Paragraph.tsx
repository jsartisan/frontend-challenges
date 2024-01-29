// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Paragraph(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { node, ...rest } = props;

  return <p className="leading-normal" {...rest} />;
}

export { Paragraph };
