import { ChannelType, EmbedBuilder, type Client, Colors } from "discord.js";

import { QuickDB } from "quick.db";
const db = new QuickDB();

export function getRandomUser(client: Client<true>) {
  const guild = getRandomGuild(client);
  const randomUser = guild?.members.cache
    .filter((member) => !member.user.bot)
    .random();

  return randomUser;
}

export function getRandomGuild(client: Client<true>) {
  return client.guilds.cache.random();
}

export async function sendPfp(client: Client<true>) {
   const channelId = await db.get('channel');

    if (!channelId) {
        return;
    }

  const member = getRandomUser(client);
  const channel = await client.channels.fetch(channelId);

  if (channel && channel.type === ChannelType.GuildText) {
    channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.DarkButNotBlack)
          .setImage(
            member?.displayAvatarURL() ??
              "https://cdn.discordapp.com/embed/avatars/5.png"
          ),
      ],
    });
  }
}
