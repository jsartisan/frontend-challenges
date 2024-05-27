import { ImageResponse } from "next/og";
import { CSSProperties } from "react";

export const dynamic = "static";
export const runtime = "edge";

export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const inter = await fetch(new URL(`./../assets/fonts/inter/Inter-Regular.ttf`, import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );
  const interBold = await fetch(new URL("./../assets/fonts/inter/Inter-Bold.ttf", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
          fontSize: 80,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: "center",
          fontFamily: "Inter",
        }}
      >
        <div
          style={
            {
              backgroundImage: "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
              color: "transparent",
            } as CSSProperties
          }
        >
          Frontend Challenges
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: inter,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
