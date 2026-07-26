import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * This endpoint purges Prismic content from Next.js' cache. It is called by
 * the "Vercel revalidate" webhook when content is published in Prismic.
 *
 * Prismic sends its webhook secret in the JSON body as `secret`.
 */
export async function POST(request: NextRequest) {
  const expectedSecret = process.env.PRISMIC_WEBHOOK_SECRET;

  if (expectedSecret) {
    const body = await request.json().catch(() => null);

    if (body?.secret !== expectedSecret) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }
  }

  revalidateTag("prismic", "max");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
