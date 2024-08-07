// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Pre(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { node, ...rest } = props;

  return <pre className="mt-2 overflow-hidden rounded-sm border" {...rest} />;
}

export { Pre };
