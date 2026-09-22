/**
 * Session settings for Atrium.
 */

export const sessionSecret = "atrium-session-secret";

export const sessionOptions = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    sameSite: false,
    secure: false
  }
};
