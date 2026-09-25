export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      status: "ok",
      service: "rich",
      buildSha: process.env.APP_BUILD_SHA || "local",
      buildTimestamp: process.env.APP_BUILD_TIMESTAMP || null,
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
