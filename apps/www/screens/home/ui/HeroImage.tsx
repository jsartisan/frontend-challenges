import Image from "next/image";

import { Icon } from "~/components/ui";

import logo from "../../../public/images/logo.svg";

const levels = {
  1: 120,
  2: 240,
  3: 360,
};

export function HeroImage() {
  return (
    <div className="desktop:h-[20vh] desktop:flex desktop:gap-32 desktop:bg-none relative isolate -z-10 hidden flex-grow flex-col items-center justify-center gap-8 bg-[length:200%_200%] bg-center bg-no-repeat">
      <Image src={logo} alt="Ragby" width={50} height={50} />
      <div className="desktop:opacity-100 absolute opacity-60">
        <div className="desktop:size-[980px] relative grid size-[450px] place-items-center">
          <svg className="overflow-visible" width="100%" height="100%" viewBox="0 0 980 980">
            {Object.keys(levels).map((level) => (
              <circle
                key={level}
                cx={490}
                cy={490}
                r={levels[level]}
                fill="none"
                strokeDasharray="4 4"
                className="stroke-border desktop:stroke-border desktop:stroke-[1px] stroke-[3px]"
                opacity={1}
              />
            ))}
          </svg>
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <OrbitingItem level={1} angleOffset={0} icon={<Icon name="static-color" />} />
          <OrbitingItem level={2} angleOffset={60} icon={<Icon name="css-color" />} />
          <OrbitingItem level={3} angleOffset={0} icon={<Icon name="javascript-color" />} />
          <OrbitingItem level={3} angleOffset={120} icon={<Icon name="typescript-color" />} />
          <OrbitingItem level={3} angleOffset={240} icon={<Icon name="react-color" />} />
        </div>
      </div>
    </div>
  );
}

type OrbitingItemProps = {
  level: keyof typeof levels;
  angleOffset: number;
  icon?: React.ReactNode;
};

export const OrbitingItem = (props: OrbitingItemProps) => {
  const { angleOffset, icon, level } = props;

  return (
    <div
      key={level}
      data-level={level}
      className="relative grid size-full place-items-center will-change-transform [grid-column:1/2] [grid-row:1/2]"
    >
      <div
        className="translate-z-0 desktop:w-9 desktop:h-9 animate-revolve desktop:[animation-play-state:running] translate-x-(--x) translate-y-(--y) h-12 w-12 rounded-full will-change-[transform] [animation-duration:50s] [animation-play-state:paused] [grid-area:1/1]"
        style={
          {
            "--level": level,
            "--angle": "0deg",
            "--angle-offset": `${angleOffset}deg`,
            "--x-amplitude": `calc(${levels[level]}px)`,
            "--y-amplitude": `calc(${levels[level]}px)`,
            "--x": "calc(cos(var(--angle) + var(--angle-offset)) * var(--x-amplitude))",
            "--y": "calc(sin(var(--angle) + var(--angle-offset)) * var(--y-amplitude))",
          } as React.CSSProperties
        }
      >
        <div className="translate-z-0 overflow-hiddened ring-border desktop:ring-1 bg-background flex size-full scale-[calc(80%+var(--level)*8%)] items-center justify-center rounded-full p-2 ring-2 transition-all duration-500">
          <div className="relative grid size-full grid-cols-1 place-items-center" style={{ opacity: 1 }}>
            <div className="flex size-full items-center justify-center text-2xl [grid-column:1/2] [grid-row:1/2]">
              {icon || "📦"}
            </div>
            <span className="sr-only">Box</span>
          </div>
        </div>
      </div>
    </div>
  );
};
