import Link from "next/link";
import { Challenge } from "@frontend-challenges/shared";
import { BreadcrumbItem, BreadcrumbLink, Breadcrumb as BreadcrumRoot } from "../../../components/ui";

type BreadcrumbProps = {
  challenge: Challenge;
};

export function Breadcrumb(props: BreadcrumbProps) {
  const { challenge } = props;

  return (
    <div className="flex items-center">
      <BreadcrumRoot separator="/">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/challenges">
            Challenges
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink className="line-clamp-1" href={`/challenges/${challenge.path}`}>
            {challenge.info["en"]?.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumRoot>
    </div>
  );
}
