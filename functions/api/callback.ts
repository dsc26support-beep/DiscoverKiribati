/**
 * Step 2 of Decap CMS GitHub login: swaps GitHub's one-time code for a token
 * and hands it to the CMS window that opened this popup.
 */
interface Env {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
}

function page(origin: string, status: "success" | "error", payload: unknown): Response {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const html = `<!doctype html><meta charset="utf-8"><title>Signing in…</title><script>
(function () {
  var message = ${JSON.stringify(message)};
  var origin = ${JSON.stringify(origin)};
  window.addEventListener("message", function (e) {
    if (e.origin === origin) window.opener.postMessage(message, origin);
  });
  window.opener.postMessage("authorizing:github", origin);
})();
</script>`;
  return new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Set-Cookie": "oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=0",
    },
  });
}

export const onRequestGet = async ({ request, env }: { request: Request; env: Env }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = /(?:^|;\s*)oauth_state=([^;]+)/.exec(request.headers.get("Cookie") ?? "")?.[1];

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return page(url.origin, "error", { message: "OAuth secrets are not configured." });
  }
  if (!code || !state || state !== cookie) {
    return page(url.origin, "error", { message: "Login expired or invalid. Please try again." });
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const data = (await res.json()) as { access_token?: string; error_description?: string };
  if (!data.access_token) {
    return page(url.origin, "error", { message: data.error_description ?? "GitHub login failed." });
  }
  return page(url.origin, "success", { token: data.access_token, provider: "github" });
};
