const timeOffReactions = (app) => {
  // TODO: Add the ability to select a range of days
  // TODO: Add input for selected date (just use current year)
  app.command('/off', async ({ command, ack, say }) => {
    const today = new Date(Date.now());
    const initialDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

    ack(); // acknowledge command request

    await say({
      'text': 'command to format time taken off',
      'blocks': [
        {
          'type': 'section',
          'block_id': 'time_off_calandar_block',
          'text': {
            'type': 'mrkdwn',
            'text': "Pick the day you're taking off.",
          },
          'accessory': {
            'type': 'datepicker',
            'action_id': 'time_off_datepicker',
            'initial_date': initialDate,
            'placeholder': {
              'type': 'plain_text',
              'text': 'Select a date',
            },
          },
        },
        {
          'type': 'actions',
          'block_id': 'time_off_buttons',
          'elements': [
            {
              'type': 'button',
              'text': {
                'type': 'plain_text',
                'text': 'Confirm',
              },
              'style': 'primary',
              'value': 'time_off_confirm',
            },
            {
              'type': 'button',
              'text': {
                'type': 'plain_text',
                'text': 'Cancel',
              },
              'value': 'time_off_cancel',
            },
          ],
        },
      ],
    });
  });

  app.action('time_off_confirm', async ({ action, ack, respond  }) => { // CONTINUE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    await ack();
    await respond(`You selected <@${action.selected_user}>`);
  });
};

export default timeOffReactions;