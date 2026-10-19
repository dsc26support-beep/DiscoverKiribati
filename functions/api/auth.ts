/**
 * Step 1 of Decap CMS GitHub login: sends the editor to GitHub.
 * Needs two Cloudflare Pages secrets: GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
 * (from a GitHub OAuth App whose callback URL is https://<your-domain>/api/callback).
 */
interface Env {
  GITHUB_CLIENT_ID?: string;
}

export const onRequestGet = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.GITHUB_CLIENT_ID) return new Response("GITHUB_CLIENT_ID is not configured.", { status: 500 });

  const url = new URL(request.url);
  const state = crypto.randomUUID();
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorize.searchParams.set("redirect_uri", `${url.origin}/api/callback`);
  authorize.searchParams.set("scope", "repo");
  authorize.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      "Set-Cookie": `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`,
    },
  });
};
