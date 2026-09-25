import { createContactHandler } from "@/libs/server/contact.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handler = createContactHandler();
export {
  handler as POST,
  handler as OPTIONS,
  handler as GET,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as HEAD,
};
