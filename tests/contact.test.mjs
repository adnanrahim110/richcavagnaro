import test from "node:test";
import assert from "node:assert/strict";
import { createContactHandler } from "../libs/server/contact.mjs";

function createMockEnv(overrides = {}) {
  return {
    SMTP_HOST: "mail.richcavagnarobooks.com",
    SMTP_PORT: "465",
    SMTP_SECURE: "ssl",
    SMTP_USERNAME: "contact@richcavagnarobooks.com",
    SMTP_PASSWORD: "test-password",
    MAIL_TO: "contact@richcavagnarobooks.com",
    MAIL_FROM_NAME: "Rich Cavagnaro Books",
    LOGO_URL: "https://rory-ruckus.com/imgs/book-mockup.png",
    MAIL_TIMEZONE: "UTC",
    CORS_ALLOWED_ORIGINS: "https://rory-ruckus.com,https://www.rory-ruckus.com",
    DEBUG_MODE: "0",
    ...overrides,
  };
}

function makeFormRequest(fields, headers = {}) {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) {
    form.append(k, v);
  }
  return new Request("https://rory-ruckus.com/api/sendEmail", {
    method: "POST",
    headers: {
      origin: "https://rory-ruckus.com",
      ...headers,
    },
    body: form,
  });
}

test("contact form sends email with expected subject, fields, and template", async () => {
  let sentMail = null;
  const handler = createContactHandler({
    env: createMockEnv(),
    createTransport: () => ({
      sendMail: async (mail) => {
        sentMail = mail;
        return { messageId: "mock-1" };
      },
    }),
    getIpInfo: async () => ({
      city: "Dallas",
      region: "Texas",
      country: "US",
      loc: "32.7767,-96.7970",
      org: "AS1234 Mock ISP",
    }),
    now: () => new Date("2026-09-26T12:00:00Z"),
  });

  const request = makeFormRequest({
    name: "Jane Doe",
    email: "jane@example.com",
    subject: "School Reading Inquiry",
    message: "We would love to invite Rich for a school reading event!",
    service: "School Visits, Book Readings",
  });

  const response = await handler(request);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.status, "success");
  assert.equal(data.message, "Message sent successfully!");

  assert.ok(sentMail);
  assert.equal(sentMail.subject, "New Website Inquiry: School Reading Inquiry");
  assert.equal(sentMail.from, '"Rich Cavagnaro Books" <contact@richcavagnarobooks.com>');
  assert.equal(sentMail.to, "contact@richcavagnarobooks.com");
  assert.deepEqual(sentMail.replyTo, { address: "jane@example.com", name: "Jane Doe" });
  assert.ok(sentMail.html.includes("Inquiry Details"));
  assert.ok(sentMail.html.includes("Jane Doe"));
  assert.ok(sentMail.html.includes("School Visits"));
  assert.ok(sentMail.html.includes("rory-ruckus.com"));
});

test("newsletter form sends subscriber details", async () => {
  let sentMail = null;
  const handler = createContactHandler({
    env: createMockEnv(),
    createTransport: () => ({
      sendMail: async (mail) => {
        sentMail = mail;
        return { messageId: "mock-2" };
      },
    }),
    now: () => new Date("2026-09-26T12:00:00Z"),
  });

  const request = makeFormRequest({
    formName: "book-newsletter",
    name: "Alex Smith",
    email: "alex@example.com",
  });

  const response = await handler(request);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.status, "success");

  assert.ok(sentMail);
  assert.equal(sentMail.subject, "New Book Newsletter Subscriber");
  assert.deepEqual(sentMail.replyTo, { address: "alex@example.com", name: "Alex Smith" });
  assert.ok(sentMail.html.includes("alex@example.com"));
});

test("honeypot suppresses delivery and returns 200 success", async () => {
  let mailSent = false;
  const handler = createContactHandler({
    env: createMockEnv(),
    createTransport: () => ({
      sendMail: async () => {
        mailSent = true;
      },
    }),
  });

  const request = makeFormRequest({
    name: "Spam Bot",
    email: "spambot@example.com",
    subject: "Spam Offer",
    message: "Buy cheap meds",
    website: "https://spam.link",
  });

  const response = await handler(request);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.status, "success");
  assert.equal(data.message, "Message received.");
  assert.equal(mailSent, false);
});

test("invalid input returns 400 error", async () => {
  const handler = createContactHandler({ env: createMockEnv() });

  const invalidContact = makeFormRequest({
    name: "J", // too short
    email: "not-an-email",
    subject: "",
    message: "",
  });
  const res1 = await handler(invalidContact);
  assert.equal(res1.status, 400);

  const invalidNewsletter = makeFormRequest({
    formName: "newsletter",
    email: "bad-email",
  });
  const res2 = await handler(invalidNewsletter);
  assert.equal(res2.status, 400);
});

test("CORS and HTTP methods preserve contract", async () => {
  const handler = createContactHandler({ env: createMockEnv() });

  const optionsRes = await handler(
    new Request("https://rory-ruckus.com/api/sendEmail", {
      method: "OPTIONS",
      headers: { origin: "https://rory-ruckus.com" },
    })
  );
  assert.equal(optionsRes.status, 204);
  assert.equal(optionsRes.headers.get("Access-Control-Allow-Origin"), "https://rory-ruckus.com");

  const disallowedRes = await handler(
    new Request("https://rory-ruckus.com/api/sendEmail", {
      method: "POST",
      headers: { origin: "https://malicious-site.com" },
    })
  );
  assert.equal(disallowedRes.status, 403);

  const getRes = await handler(
    new Request("https://rory-ruckus.com/api/sendEmail", {
      method: "GET",
      headers: { origin: "https://rory-ruckus.com" },
    })
  );
  assert.equal(getRes.status, 405);
});
