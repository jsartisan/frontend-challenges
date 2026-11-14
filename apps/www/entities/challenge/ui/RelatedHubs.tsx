import type { RelatedHub } from "~/entities/challenge/lib/getRelatedHubs";

import { Link } from "~/components/ui";

export function RelatedHubs(props: { hubs: RelatedHub[] }) {
  if (props.hubs.length === 0) return null;

  return (
    <nav aria-label="Related challenge lists" className="border-border mt-6 border-t pt-4">
      <h2 className="text-sm font-semibold">Keep practicing</h2>
      <ul className="mt-2 flex flex-col gap-1 text-sm">
        {props.hubs.map((hub) => (
          <li key={hub.href}>
            <Link href={hub.href} className="hover:text-foreground underline underline-offset-2">
              {hub.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
