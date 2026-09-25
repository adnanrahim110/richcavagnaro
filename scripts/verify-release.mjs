const baseUrl = process.argv[2] || "http://127.0.0.1:3000";
const expectedSha = process.argv[3] || process.env.APP_BUILD_SHA;

try {
  const url = new URL("/api/health", baseUrl);
  url.searchParams.set("release", expectedSha || "local");
  const response = await fetch(url, {
    signal: AbortSignal.timeout(5000),
    cache: "no-store",
    redirect: "error",
  });
  if (!response.ok) throw new Error(`Health endpoint returned HTTP ${response.status}`);
  const health = await response.json();
  if (health.status !== "ok" || health.service !== "rich") {
    throw new Error("Health endpoint did not identify a healthy Rich application");
  }
  if (expectedSha && health.buildSha !== expectedSha) {
    throw new Error(`Expected release ${expectedSha}, received ${health.buildSha}`);
  }
  console.log(`[health] Rich ${health.buildSha} is ready`);
} catch (error) {
  console.error(`[health] ${error.message}`);
  process.exitCode = 1;
}
