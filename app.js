import slackBolt from '@slack/bolt';
import nodeFetch from 'node-fetch';
import _ from 'lodash';
import { createApi } from 'unsplash-js';
import 'dotenv/config';

const { App } = slackBolt;
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});

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
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there, <@${message.user}>!`);
});

// Lists the people who have marked themselves as "free agent"
app.message(
  /^(who is free|list free agents|get free agents|is anyone free).*/,
  async ({ message, say, client }) => {
    // try {
    //   const messages = await searchConversationHistory(message.channel, client, ["i'm a free agent", 'im a free agent'], 100);
    //   const users = messages.map(m => m.user);
    //   const names = await getManyNamesFromUserIDs(users, client);
    //   const uniqueNames = Array.from(new Set(names)).join(', ');
    //   say(`Free agents:\n${uniqueNames}`);
    // } catch (e) {
    //   console.log('Something went wrong while getting free agents!');
    // };
    const messages = await searchConversationHistory(message.channel, client, ["i'm a free agent", 'im a free agent'], 100);
    const users = messages.map(m => m.user);
    const names = await getManyNamesFromUserIDs(users, client);
    const uniqueNames = Array.from(new Set(names)).join(', ');
    say(`Free agents:\n${uniqueNames}`);
  }
);

// Listens to incoming messages that contain "giraffe"
app.message('giraffe', async ({ message, say }) => {
  unsplash.photos
    .getRandom({ query: 'giraffe', count: 1 })
    .then((result) => {
      console.log(result.response[0].urls.raw);
      const photo = result.response[0].urls.raw;

      say({
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
              'image_url': photo, //'https://source.unsplash.com/random?giraffe',
              'alt_text': 'giraffe',
            },
          },
        ],
      });
    })
    .catch(() => {
      console.log('Something went wrong while getting a giraffe!');
    });
});

// TODO: CHANGE TO TAKE IN LIMIT INPUT THAT PAGINATES
const searchConversationHistory = async (channel, client, searchArr, limit = 100) => {
  const result = await client.conversations.history({ token: process.env.SLACK_BOT_TOKEN, channel, limit})
  const messages = result.messages.filter(message => {
    const text = message.text.toLowerCase();
    return searchArr.some(s => text.includes(s)); // TODO: CHANGE TO REGEX MATCHING
  })
  return messages;
};

const getManyNamesFromUserIDs = async (idArr, client) => {
  const users = []
  const promises = idArr.map(async (id) => {
    const user = await getNameFromUserID(id, client);
    users.push(user);
  })

  await Promise.all(promises);
  return users;
}

const getNameFromUserID = async (id, client) => {
  const user = await client.users.profile.get({ token: process.env.SLACK_BOT_TOKEN, user: id })
  return user.profile.real_name;
};

(async () => {
  // Start your app
  await app.start();
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
