import slackBolt from '@slack/bolt';
import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';
import 'dotenv/config';

const { App } = slackBolt;
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});

console.log("hello");

// Initializes your app with your bot token and signing secret
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

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  console.log("hello in message");
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there, <@${message.user}>!`);
});

// Listens to incoming messages that contain "giraffe"
app.message('giraffe', async ({ message, say }) => {
  console.log("hello in giraffe");
  // say() sends a message to the channel where the event was triggered
  const giraffeImage = await unsplash.photos.getRandom('giraffe');
  console.log(giraffeImage.urls.full);
  console.log(giraffeImage);
  await say({
    'text': 'a giraffe image',
    'blocks': [
      {
        'type': 'section',
        'block_id': 'section1',
        'text': {
          'type': 'mrkdwn',
          'text': `Have a giraffe, <@${message.user}>!.`,
        },
        'accessory': {
          'type': 'image',
          'image_url': giraffeImage.urls.full, //'https://source.unsplash.com/random?giraffe',
          'alt_text': 'giraffe',
        },
      },
    ],
  });
});

(async () => {
  // Start your app
  await app.start();
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
