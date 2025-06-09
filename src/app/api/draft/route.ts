//@ts-expect-error Something is wrong with the types
import { enableDraftHandler } from "@contentful/vercel-nextjs-toolkit/app-router";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  const slug = url.searchParams.get("slug");

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    await enableDraftHandler(req);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    /* empty */
  }

  if (slug) {
    return NextResponse.redirect(`${slug}`);
  }

  return NextResponse.json({ message: "Preview mode enabled" });
}
