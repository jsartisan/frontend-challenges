import { cn } from "../../utils/helpers";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function Layout(props: LayoutProps) {
  const { children, className } = props;

  return (
    <main className={cn("h-full grow", className)}>
      <div className="max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6">{children}</div>
    </main>
  );
}
