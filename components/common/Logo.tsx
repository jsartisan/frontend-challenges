import Link from "next/link";

function Logo() {
  return (
    <Link className="inline-flex items-center" aria-label="Go to the homepage" href="/">
      <img src="/images/logo.svg" style={{ height: "20px" }} />
      <div className={`font-nunito ml-3 hidden text-lg font-semibold text-[var(--color-fg)] md:block`}>
        FrontendChallenges
      </div>
    </Link>
  );
}

export { Logo };
