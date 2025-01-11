import { google } from 'googleapis';

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth`
);

oauth2Client.setCredentials({
  redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth`,
});

export const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
