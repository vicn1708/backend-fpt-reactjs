import 'dotenv/config';

const appSetting = {
  jwt: {
    secret: process.env.JWT_SECRET,
    exp: process.env.JWT_EXP,
    expRefresh: process.env.JWT_EXP_REFRESH,
  },
  firebase: {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_API_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
  },
};

export default appSetting;
