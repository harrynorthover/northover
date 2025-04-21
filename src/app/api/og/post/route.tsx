import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

import { PostOGTemplate } from "../images/PostOgTemplate";

export const runtime = "edge";

const COLOR_MAP = {
  red: ["#FF4B5C", "#FF1E56"],
  blue: ["#4BCFFA", "#0FBCF9"],
  purple: ["#A55EEA", "#8854D0"],
  orange: ["#FF9F43", "#FF6B6B"],
  yellow: ["#FFC312", "#EE5A24"],
  pink: ["#FF6B81", "#FF4D6D"],
  teal: ["#1B9CFC", "#45Aaf2"],
};

function getRandomGradient(): [string, string] {
  const keys = Object.keys(COLOR_MAP);
  const randomKey = keys[
    Math.floor(Math.random() * keys.length)
  ] as keyof typeof COLOR_MAP;
  const [start, end] = COLOR_MAP[randomKey];

  return [start, end];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Untitled Post";

  const colors = getRandomGradient();
  const fontUrl = new URL(
    "/fonts/Merriweather_96pt-Black.ttf",
    process.env.NEXT_PUBLIC_SITE_URL
  );
  const data = await fetch(fontUrl).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <PostOGTemplate colors={colors}>{title}</PostOGTemplate>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Merriweather",
          data,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
