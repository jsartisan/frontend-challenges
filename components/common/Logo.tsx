import Link from "next/link";

type LogoProps = {
  isTextVisible?: boolean;
};

function Logo(props: LogoProps) {
  const { isTextVisible } = props;

  return (
    <Link className="inline-flex items-center" aria-label="Go to the homepage" href="/">
      <img src="/images/logo.svg" style={{ height: "20px" }} alt="Frontend Challenges" title="Frontend Challenges" />
      {isTextVisible && (
        <div className={`font-nunito ml-3 hidden text-lg font-semibold text-[var(--color-fg)] md:block`}>
          FrontendChallenges
        </div>
      )}
    </Link>
  );
}

export { Logo };
