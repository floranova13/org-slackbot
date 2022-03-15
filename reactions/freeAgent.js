import { getManyNamesFromUserIDs } from '../utils/index.js';
import { searchFreeAgentMessages } from '../utils/freeAgent.js';
const freeAgentReactions = (app) => {
  // Lists the people who have marked themselves as "free agent"
  app.message(
    /^(who is free|list free agents|get free agents|is anyone free).*/,
    async ({ message, say, client }) => {
      const users = await searchFreeAgentMessages(message.channel, client, 100);
      const names = await getManyNamesFromUserIDs(users, client);
      const uniqueNames = Array.from(new Set(names)).sort();
      const nameBlocks =
        uniqueNames && uniqueNames.length
          ? uniqueNames.map((s) => {
              return {
                'type': 'section',
                'text': {
                  'type': 'mrkdwn',
                  'text': `*${s}*`,
                },
              };
            })
          : [
              {
                'type': 'section',
                'text': {
                  'type': 'mrkdwn',
                  'text': `*NONE*`,
                },
              },
            ];

      say({
        'text': 'free agent members',
        'blocks': [
          {
            'type': 'section',
            'block_id': 'section1',
            'text': {
              'type': 'mrkdwn',
              'text': '*Free Agents:*',
            },
          },
          ...nameBlocks,
        ],
      });
    }
  );
};

export default freeAgentReactions;
