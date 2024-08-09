import { ComponentPropsWithRef } from "react";

import { Link } from "../ui";
import { cn } from "../../utils/helpers";

type LogoProps = {
  svgClassName?: string;
  isTextVisible?: boolean;
} & ComponentPropsWithRef<"a">;

function Logo(props: LogoProps) {
  const { isTextVisible, svgClassName = "", ...rest } = props;

  return (
    <Link className="inline-flex items-center" aria-label="Go to the homepage" href="/" {...rest}>
      <svg className={cn("size-5", svgClassName)} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.4272 0H1.57279C0.704162 0 0 0.869847 0 1.94286V14.0571C0 15.1302 0.704162 16 1.57279 16H15.4272C16.2958 16 17 15.1302 17 14.0571V1.94286C17 0.869847 16.2958 0 15.4272 0Z"
          fill="#0099FF"
        />
        <path
          d="M18.5728 17H32.4272C33.2958 17 34 17.9242 34 19.0643V31.9357C34 33.0758 33.2958 34 32.4272 34H18.5728C17.7042 34 17 33.0758 17 31.9357V19.0643C17 17.9242 17.7042 17 18.5728 17Z"
          fill="#0099FF"
        />
        <path
          d="M27 14C30.866 14 34 10.866 34 7C34 3.13401 30.866 0 27 0C23.134 0 20 3.13401 20 7C20 10.866 23.134 14 27 14Z"
          fill="#99D6FF"
        />
        <path
          d="M7 34C3.13401 34 0 30.866 0 27C0 23.134 3.13401 20 7 20C10.866 20 14 23.134 14 27C14 30.866 10.866 34 7 34Z"
          fill="#99D6FF"
        />
      </svg>
      {isTextVisible && (
        <div className={`font-nunito ml-3 hidden text-lg font-semibold text-[var(--color-fg)] md:block`}>
          FrontendChallenges
        </div>
      )}
    </Link>
  );
}

export { Logo };
