import Image from "next/image";

import logo from "~/public/images/logo.svg";

interface FullPageLoaderProps {
  description?: string;
}

export function FullPageLoader(props: FullPageLoaderProps) {
  const { description } = props;

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-3">
      <Image src={logo} height={30} width={30} alt="Logo" className="h-10 w-auto animate-pulse grayscale" />
      {description && <p className="text-(--color-fg-subtle) text-sm">{description}</p>}
    </div>
  );
}
