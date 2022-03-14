export const getManyNamesFromUserIDs = async (idArr, client) => {
  const users = [];
  const promises = idArr.map(async (id) => {
    const user = await getNameFromUserID(id, client);
    users.push(user);
  });

  await Promise.all(promises);
  return users;
};

export const getNameFromUserID = async (id, client) => {
  const user = await client.users.profile.get({
    token: process.env.SLACK_BOT_TOKEN,
    user: id,
  });
  return user.profile.real_name;
};

// TODO: CHANGE TO TAKE IN LIMIT INPUT THAT PAGINATES
export const searchConversationHistory = async (
  channel,
  client,
  searchArr,
  limit = 100
) => {
  const result = await client.conversations.history({
    token: process.env.SLACK_BOT_TOKEN,
    channel,
    limit,
  });
  const messages = result.messages.filter((message) => {
    const text = message.text.toLowerCase();
    return searchArr.some((s) => text.includes(s)); // TODO: CHANGE TO REGEX MATCHING
  });
  console.log(messages.map((m) => m.ts));
  return messages;
};