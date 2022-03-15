const generalReactions = (app) => {
  app.message('hello bot', async ({ message, say }) => {
    await say(`Hey there, <@${message.user}>!`);
  });

  app.message('giraffe-bot help', async ({ message, say }) => {
    await say({
      'text': 'giraffe help info',
      'blocks': [
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            'text':
              "*Giraffe Bot:*\nHey there 👋 I'm giraffe-bot. I'm here to help you in Slack.\n",
          },
        },
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            'text': '*:one: Say `hello bot`*. It says hello back.',
          },
        },
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            'text':
              '*:two: Say `get giraffe`.* You will recieve a giraffe and a bonus giraffe fact back.',
          },
        },
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            'text':
              '*:three: Say `list free agents`, `get free agents`, or `who is free`.* You will recieve a list of people who have marked themselves as free agents.',
          },
        },
        {
          'type': 'section',
          'text': {
            'type': 'mrkdwn',
            'text':
              "➕ To start giraffing, *add me to a channel* and I'll introduce myself. I'm usually added to a team or project channel. Type `/invite @giraffe-bot` from the channel or pick a channel on the right.",
          },
          'accessory': {
            'type': 'conversations_select',
            'placeholder': {
              'type': 'plain_text',
              'text': 'Select a channel...',
              'emoji': true,
            },
          },
        },
      ],
    });
  });
};

// const generalReactions = (app) => {
//   app.command('/hello', async ({ command, ack, say }) => {
//     await ack(); // acknowledge command request
//     await say(`Hey there, <@${command.user}>!`);
//   });

//   app.command('/help', async ({ command, ack, say }) => {
//     await ack(); // acknowledge command request
//     await say({
//       'blocks': [
//         {
//           'type': 'section',
//           'text': {
//             'type': 'mrkdwn',
//             'text':
//               "*Giraffe Bot:*\nHey there 👋 I'm giraffe-bot. I'm here to help you in Slack.\n",
//           },
//         },
//         {
//           'type': 'section',
//           'text': {
//             'type': 'mrkdwn',
//             'text': '*:one: Use the `/hello` command*. It says hello back.',
//           },
//         },
//         {
//           'type': 'section',
//           'text': {
//             'type': 'mrkdwn',
//             'text':
//               '*:two: Use the `/giraffe` command.* You will recieve a giraffe and a bonus giraffe fact back.',
//           },
//         },
//         {
//           'type': 'section',
//           'text': {
//             'type': 'mrkdwn',
//             'text':
//               '*:three: Use the `/free` command.* You will recieve a list of people who have marked themselves as free agents.',
//           },
//         },
//         {
//           'type': 'section',
//           'text': {
//             'type': 'mrkdwn',
//             'text':
//               "➕ To start tracking your team's tasks, *add me to a channel* and I'll introduce myself. I'm usually added to a team or project channel. Type `/invite @giraffe-bot` from the channel or pick a channel on the right.",
//           },
//           'accessory': {
//             'type': 'conversations_select',
//             'placeholder': {
//               'type': 'plain_text',
//               'text': 'Select a channel...',
//               'emoji': true,
//             },
//           },
//         },
//       ],
//     });
//   });
// };

export default generalReactions;
