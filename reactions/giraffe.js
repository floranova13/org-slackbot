import { facts } from '../resources/giraffe.js';
import _ from 'lodash';

const giraffeReactions = (app, unsplash) => {
  // Listens to incoming messages that contain "giraffe"
  app.message('get giraffe', async ({ message, say }) => {
    unsplash.photos
      .getRandom({ query: 'giraffe', count: 1 })
      .then((result) => {
        const photo = result.response[0].urls.raw;

        say({
          'text': 'a giraffe image',
          'blocks': [
            {
              'type': 'section',
              'block_id': 'section1',
              'text': {
                'type': 'mrkdwn',
                'text': `Have a giraffe, <@${
                  message.user
                }>!\n\n*Bonus Giraffe Fact:*\n${_.sample(facts)}`,
              },
              'accessory': {
                'type': 'image',
                'image_url': photo,
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
};

export default giraffeReactions;
