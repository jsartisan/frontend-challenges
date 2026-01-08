import { Logo } from "~/shared/ui/Logo";

export function Header() {
  return (
    <>
      <div className="bg-backgroundsticky top-0 z-30 w-full bg-opacity-5 backdrop-blur-md transition-[background-color]">
        <div className="mx-auto px-4">
          <div className="h-(--navbar-height) flex items-center justify-between md:justify-start md:gap-4">
            <div className="flex flex-grow items-center justify-start gap-3">
              <Logo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
