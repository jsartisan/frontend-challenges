import { Icon } from "~/components/ui";
import { getFaviconUrl } from "~/entities/resource/lib/faviconUtils";

interface ResourceListItemProps {
  resource: string;
}

export const ResourceListItem = (props: ResourceListItemProps) => {
  const { resource } = props;

  return (
    <a
      href={resource}
      target="_blank"
      className="hover:bg-(--color-bg-neutral-subtle) group flex items-start gap-2 rounded p-1"
    >
      <img
        src={getFaviconUrl(resource)}
        alt={resource}
        className="bg-(--color-bg-neutral-subtle) h-6 w-6 rounded p-1"
      />
      <div className="flex flex-col">
        <span className="text-(--color-fg-neutral-subtle) text-sm">{resource}</span>
      </div>
      <Icon
        name="external-link"
        className="text-(--color-fg-neutral-subtle) me-1 ms-auto hidden self-center group-hover:block"
      />
    </a>
  );
};
