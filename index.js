const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, () => {
  console.log('Online');
});

client.on(Events.MessageCreate, async (message) => {

  const twitter = message.content.match(/^\s*(https?:\/\/)?(www\.)?x\.com\/([^\s\/]+)\/status\/([^\s\/?]+)/);

  if (message.author.bot) return;
  if (!twitter) return;

  await message.delete().catch(e => console.error(e));

  //https://github.com/dylanpdx/BetterTwitFix - dylanpdx 💕
  message.channel.send(`Enviado por: **${message.author}** \nhttps://fixupx.com/${twitter[3]}/status/${twitter[4]}`);

});

if (!process.env.TOKEN) throw new Error('Add Bot token in .env');
client.login(process.env.TOKEN);
