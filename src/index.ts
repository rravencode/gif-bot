import { Client, IntentsBitField, Partials, PermissionsBitField } from "discord.js";
import config from "./config";
import { sendPfp } from "./utils";

import { QuickDB } from "quick.db";
const db = new QuickDB();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.on("ready", () => {
  console.log("Bot başarıyla discord'a giriş yaptı.");

  client.user?.setPresence({ activities: [{ name: 'developing by @arassz' }] })

  setInterval(async () => sendPfp(client), 5000);
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!kanal')) {
        const channel = message.mentions.channels.first();
        const member = message.member;

        if (!channel) {
            message.reply('> ✖️ **|** Bu komutu kullanmak için bir kanal etiketlemen gerekiyor.');
            return;
        }

        if (!member?.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            message.reply('> ✖️ **|** Bu komutu kullanmak için sunucuyu yönetmen gerekiyor.');
            return;
        }

        await db.set('channel', channel.id);
        message.reply('Kanal başarılı bir şekilde ayarlandı!')
    }
});

client.login(config.discord.token);
