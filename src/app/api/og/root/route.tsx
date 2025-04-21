import { ImageResponse } from "next/og";

import { RootOGTemplate } from "../images/RootOgTemplate";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(<RootOGTemplate />, {
    width: 1200,
    height: 630,
  });
}
