// TODO: CHANGE TO TAKE IN LIMIT INPUT THAT PAGINATES
export const searchFreeAgentMessages = async (channel, client, limit = 100) => {
  const freeMessages = ["i'm a free agent", "i'm free", 'im a free agent', 'im free'];
  const busyMessages = [
    "i'm not free",
    "i'm no longer free",
    "i'm busy",
    'im not free',
    'im no longer free',
    'im busy',
  ];
  const freeAgentMessages = [...freeMessages, ...busyMessages];
  const userDict = {};
  const result = await client.conversations.history({
    token: process.env.SLACK_BOT_TOKEN,
    channel,
    limit,
  });
  const messages = result.messages.filter((message) => {
    const text = message.text.toLowerCase();
    return freeAgentMessages.some((s) => text.includes(s)); // TODO: CHANGE TO REGEX MATCHING
  });

  messages.sort((a, b) => (a.ts < b.ts ? -1 : 1));

  for (let m of messages) {
    const text = m.text.toLowerCase();

    if (userDict.hasOwnProperty(m.user) && m.ts > userDict[m.user]) {
      if (freeMessages.some((s) => text.includes(s))) {
        userDict[m.user] = m.ts;
      } else {
        delete userDict[m.user];
      }
    } else {
      if (freeMessages.some((s) => text.includes(s))) {
        userDict[m.user] = m.ts;
      }
    }
  }

  return Object.keys(userDict);
};