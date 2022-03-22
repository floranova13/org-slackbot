import slackBolt from '@slack/bolt';
import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';
import 'dotenv/config';
import generalReactions from './reactions/index.js';
import giraffeReactions from './reactions/giraffe.js';
import freeAgentReactions from './reactions/freeAgent.js';
import timeOffReactions from './reactions/timeOff.js';

const { App } = slackBolt;
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});

// Initializes app
const port = 3000;
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: process.env.PORT || port,
});

generalReactions(app);
giraffeReactions(app, unsplash);
freeAgentReactions(app);
timeOffReactions(app);

(async () => {
  await app.start();
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
