const generalReactions = (app) => {
  app.message('hello', async ({ message, say }) => {
    await say(`Hey there, <@${message.user}>!`);
  });
}

export default generalReactions;