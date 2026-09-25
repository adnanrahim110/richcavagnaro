import { getMailConfig } from "../libs/server/mail-config.mjs";

try {
  const config = getMailConfig();
  new Intl.DateTimeFormat("en-US", { timeZone: config.timeZone });
} catch (error) {
  console.error(`[env] ${error.message}`);
  process.exitCode = 1;
}
