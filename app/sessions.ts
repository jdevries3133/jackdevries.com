// app/sessions.js
import { createCookieSessionStorage } from "remix";
import { COOKIE_TIMEOUT } from "./config";

export const {
  getSession,
  commitSession: _commitSessionDefault,
  destroySession,
} = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: "__session",
    domain:
      process.env.NODE_ENV === "production" ? "jackdevries.com" : "localhost",
    httpOnly: true,
    path: "/",
    secrets: [process.env.SECRET_KEY || ""],
    sameSite: "lax",
    secure: true,
  },
});

/**
 * commitSession wrapper that sets an expiration
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
