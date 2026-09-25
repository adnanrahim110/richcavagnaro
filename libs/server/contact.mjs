import { isIP } from "node:net";
import nodemailer from "nodemailer";
import { escapeHtml } from "./html.mjs";
import { getMailConfig, isEmail } from "./mail-config.mjs";
import { renderFormEmail, renderNewsletterEmail } from "./form-email-template.mjs";

const skippedFields = new Set([
  "g-recaptcha-response",
  "formName",
  "fullName",
  "firstName",
  "lastName",
  "consent",
  "website",
  "source",
]);

const clean = (value, max = 1000) => {
  if (typeof value !== "string") return "";
  const trimmed = value.trim().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return trimmed.slice(0, max);
};

function readFields(formData) {
  const fields = Object.create(null);
  for (const [key, value] of formData) {
    if (typeof value !== "string") continue;
    if (key.endsWith("[]")) {
      const name = key.slice(0, -2);
      fields[name] = [...(Array.isArray(fields[name]) ? fields[name] : []), value];
    } else {
      fields[key] = value;
    }
  }
  return fields;
}

export function buildOrderedFields(fields) {
  const preferred = ["name", "email", "subject", "phone", "message"];
  const priority = (key) => {
    const index = preferred.indexOf(key.toLowerCase());
    return index === -1 ? Infinity : index;
  };

  return Object.entries(fields)
    .filter(([key]) => !skippedFields.has(key))
    .map(([key, value]) => [key, String(Array.isArray(value) ? value.join(", ") : value).trim()])
    .filter(([, value]) => value !== "")
    .sort(([a], [b]) => priority(a) - priority(b) || (a < b ? -1 : a > b ? 1 : 0))
    .map(([key, value]) => ({
      label: key
        .replace(/[_-]/g, " ")
        .replace(/(?<!^)([A-Z])/g, " $1")
        .trim()
        .replace(/\s+/g, " ")
        .replace(/(^|\s)(\S)/g, (_, space, letter) => space + letter.toUpperCase()),
      value: /message/i.test(key)
        ? escapeHtml(value).replace(/\r\n|\n\r|\r|\n/g, "<br />\n")
        : escapeHtml(value),
    }));
}

function formatDate(date, timeZone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
      .formatToParts(date)
      .map(({ type, value }) => [type, value])
  );
  return `${parts.weekday}, ${parts.month} ${parts.day}, ${parts.year} ${parts.hour}:${parts.minute} ${parts.dayPeriod}`;
}

async function lookupIp(ip) {
  if (!isIP(ip)) return {};
  try {
    const response = await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}/json`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return {};
    const info = await response.json();
    return info && typeof info === "object" && !Array.isArray(info) ? info : {};
  } catch {
    return {};
  }
}

export function createContactHandler({
  env = process.env,
  createTransport = nodemailer.createTransport,
  getIpInfo = lookupIp,
  now = () => new Date(),
  logError = (message) => console.error(message),
} = {}) {
  return async function handleContact(request) {
    const origin = request.headers.get("origin")?.trim() || "";
    const defaultOrigins = [
      "https://rory-ruckus.com",
      "https://www.rory-ruckus.com",
      "https://richcavagnarobooks.com",
      "https://www.richcavagnarobooks.com",
    ];
    const allowedOrigins = env.CORS_ALLOWED_ORIGINS
      ? env.CORS_ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)
      : defaultOrigins;

    const allowed =
      allowedOrigins.includes(origin) ||
      (!allowedOrigins.length && origin === new URL(request.url).origin);

    const headers = {
      "Vary": "Origin",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      ...(origin && allowed ? { "Access-Control-Allow-Origin": origin } : {}),
    };

    const reply = (status, message, httpStatus) =>
      Response.json({ status, message }, { status: httpStatus, headers });

    if (origin && !allowed) {
      return reply("error", "Origin is not allowed.", 403);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return reply("error", "Method Not Allowed. Please use POST.", 405);
    }

    let fields;
    try {
      fields = readFields(await request.formData());
    } catch {
      return reply("error", "Invalid or missing input data.", 400);
    }

    const honeypot = clean(fields.website, 120);
    if (honeypot !== "") {
      return reply("success", "Message received.", 200);
    }

    const formName = clean(fields.formName, 80);
    const isNewsletter = formName === "newsletter" || formName === "book-newsletter";
    const name = clean(fields.name, 100);
    const email = clean(fields.email, 254);
    const subjectInput = clean(fields.subject, 150);
    const messageInput = clean(fields.message, 1000);
    const service = clean(fields.service, 150);

    if (isNewsletter) {
      if (!isEmail(email)) {
        return reply("error", "A valid email address is required.", 400);
      }
    } else {
      if (
        !name ||
        name.length < 2 ||
        !isEmail(email) ||
        !subjectInput ||
        !messageInput
      ) {
        return reply(
          "error",
          "Please complete your name, email, subject, and message before submitting.",
          400
        );
      }
    }

    let config;
    try {
      config = getMailConfig(env);
    } catch (error) {
      logError(error.message);
      return reply(
        "error",
        "The mail service is not configured yet. Please try again later.",
        500
      );
    }

    try {
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        request.headers.get("x-real-ip") ||
        "N/A";
      const info = await getIpInfo(ip);
      const sender = {
        ip,
        city: info.city ?? "N/A",
        region: info.region ?? "N/A",
        country: info.country ?? "N/A",
        loc: info.loc ?? "N/A",
        org: info.org ?? "N/A",
        referer: request.headers.get("referer") || "N/A",
      };

      const dateStr = formatDate(now(), config.timeZone);
      let subject;
      let emailTitle;

      if (isNewsletter) {
        subject =
          formName === "book-newsletter"
            ? "New Book Newsletter Subscriber"
            : "New Newsletter Subscriber";
        emailTitle = subject;
      } else if (name) {
        subject = subjectInput
          ? `New Website Inquiry: ${subjectInput}`
          : `New Website Inquiry from ${name}`;
        emailTitle = "New Rich Cavagnaro Books Inquiry";
      } else {
        subject = service ? "New Inquiry from Sign-Up" : "New Website Inquiry";
        emailTitle = "New Rich Cavagnaro Books Inquiry";
      }

      const senderName = name || (isNewsletter ? "Subscriber" : "Website Visitor");

      let html;
      let alt;

      if (isNewsletter) {
        html = renderNewsletterEmail({
          meta: {
            title: emailTitle,
            dateStr,
            logoUrl: config.logoUrl,
            source: formName,
          },
          subscriber: {
            name,
            email,
          },
          sender,
        });

        alt = `${emailTitle}\n${dateStr}\n\nEmail: ${email}\n`;
        if (name) alt += `Name: ${name}\n`;
        alt += `Source: ${formName}\n`;
      } else {
        const serviceChips = service
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((item) => `<span class="chip">${escapeHtml(item)}</span>`)
          .join("");

        const rows = buildOrderedFields(fields);

        html = renderFormEmail({
          meta: {
            title: emailTitle,
            dateStr,
            serviceChips,
          },
          rows,
          sender,
        });

        alt = `${emailTitle}\n${dateStr}\n\n`;
        for (const r of rows) {
          alt += `${r.label}: ${r.value.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "")}\n`;
        }
      }

      await createTransport(config.transport).sendMail({
        from: config.from,
        to: config.to,
        replyTo: { address: email, name: senderName },
        subject,
        html,
        text: alt,
      });

      return reply("success", "Message sent successfully!", 200);
    } catch (error) {
      logError(config.debugMode ? error.message : "Email delivery failed.");
      const message = config.debugMode
        ? `Message could not be sent. Error: ${error.message}`
        : "We could not send your message right now. Please try again later.";
      return reply("error", message, 500);
    }
  };
}
