// app/sessions.js
import { createCookieSessionStorage } from "@remix-run/node";
import { COOKIE_TIMEOUT, DOMAIN, SESSION_SECRET } from "./config.server";

export const {
  getSession,
  commitSession: _commitSessionDefault,
  destroySession,
} = createCookieSessionStorage({
  cookie: {
    name: "__session",
    domain: DOMAIN,
    httpOnly: true,
    path: "/",
    secrets: [SESSION_SECRET],
    sameSite: "strict",
    secure: true,
  },
});

/**
 * commitSession wrapper that also resets the cookie expiration date
 */
export const commitSession: typeof _commitSessionDefault = (
  session,
  opts = {}
) => {
  if (opts.expires === undefined) {
    opts.expires = new Date(Date.now() + COOKIE_TIMEOUT);
  }
  return _commitSessionDefault(session, opts);
};
