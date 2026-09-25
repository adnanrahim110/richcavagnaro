import { readFileSync } from "node:fs";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value) {
  return typeof value === "string" && EMAIL_PATTERN.test(value.trim());
}

export function parsePort(value, fallback = 465) {
  const port = Number(value);
  return Number.isInteger(port) && port >= 1 && port <= 65535 ? port : fallback;
}

export function getSecureMode(secureValue, port) {
  const normalized = (secureValue || "").toLowerCase().trim();
  if (normalized === "ssl" || normalized === "smtps") return true;
  if (normalized === "tls" || normalized === "starttls" || normalized === "false" || normalized === "0") return false;
  if (normalized === "true" || normalized === "1") return true;
  return port === 465;
}

export function resolvePassword(env = process.env) {
  if (env.SMTP_PASSWORD_FILE) {
    try {
      return readFileSync(env.SMTP_PASSWORD_FILE, "utf8").trim();
    } catch (error) {
      throw new Error(`Failed to read SMTP_PASSWORD_FILE: ${error.message}`);
    }
  }
  return env.SMTP_PASSWORD ? String(env.SMTP_PASSWORD).trim() : "";
}

export function getMailConfig(env = process.env) {
  const host = (env.SMTP_HOST || "").trim();
  const user = (env.SMTP_USERNAME || env.SMTP_USER || "").trim();
  const pass = resolvePassword(env);
  const port = parsePort(env.SMTP_PORT, 465);
  const secure = getSecureMode(env.SMTP_SECURE, port);
  const to = (env.MAIL_TO || user || "contact@richcavagnarobooks.com").trim();
  const fromAddress = (env.MAIL_FROM || user).trim();
  const fromName = (env.MAIL_FROM_NAME || "Rich Cavagnaro Books").trim();
  const logoUrl = (env.LOGO_URL || "https://rory-ruckus.com/imgs/book-mockup.png").trim();
  const timeZone = (env.MAIL_TIMEZONE || "UTC").trim();
  const debugMode = env.DEBUG_MODE === "1" || env.DEBUG_MODE === "true";

  if (!host || !user || !pass) {
    throw new Error("Missing required email credentials: SMTP_HOST, SMTP_USERNAME, or SMTP_PASSWORD");
  }

  return {
    transport: {
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: true,
      },
    },
    from: fromName ? `"${fromName}" <${fromAddress}>` : fromAddress,
    fromAddress,
    fromName,
    to,
    logoUrl,
    timeZone,
    debugMode,
  };
}
