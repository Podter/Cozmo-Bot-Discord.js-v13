import { GuildMember, Snowflake, MessageEmbed } from 'discord.js';
import {
	AudioPlayerStatus,
	AudioResource,
	entersState,
	joinVoiceChannel,
	VoiceConnectionStatus
} from '@discordjs/voice';
import { Track } from './track';
import { MusicSubscription } from './subscription';
const ytpl = require('ytpl');
import dotenv from "dotenv"
import path from "path"
dotenv.config()
const spotifyToYT = require("spotify-to-yt")
spotifyToYT.setCredentials(process.env.SPOTIFYCLIENTID, process.env.SPOTIFYCLIENTSECRET)
const youtubedl = require('youtube-dl-exec')

const subscriptions = new Map<Snowflake, MusicSubscription>();

export async function play(interaction: any, args: any, musicStreaming: any, member: any) {
    let subscription = subscriptions.get(interaction.guildId);

    if (!subscription) {
        if (member instanceof GuildMember && member.voice.channel) {
            const channel = member.voice.channel;
            subscription = new MusicSubscription(
                joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                }),
            );
            subscription.voiceConnection.on('error', console.warn);
            subscriptions.set(interaction.guildId, subscription);
        }
    }

    if (!subscription) {
        await interaction.editReply('Join Voice Channel to Get Started! 🎶');
        return;
    }

    try {
        await entersState(subscription.voiceConnection, VoiceConnectionStatus.Ready, 20e3);
    } catch (error) {
        console.warn(error);
        const embed = new MessageEmbed()
        embed.setColor('#f28fad')
        embed.setTitle(`Failed to join Voice Channel!`)
        embed.setAuthor('Error! ❌')
        embed.setDescription(`${error}`)
        embed.setTimestamp()
        embed.setFooter('Cozmo');
        interaction.editReply({ embeds: [embed] });
        return;
    }

    try {
        const track = await Track.from(args, {
            onStart() {
                console.log(`Now playing ${track.title}`)
            },
            onFinish() {
                console.log(`Now finished ${track.title}`)
            },
            onError(error) {
                console.warn(error);
                const embed = new MessageEmbed()
                embed.setColor('#f28fad')
                embed.setTitle(`Error code:`)
                embed.setAuthor('Error! ❌')
                embed.setDescription(`${error}`)
                embed.setTimestamp()
                embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
                interaction.editReply({ embeds: [embed] });
            },
        });
        subscription.enqueue(track);
        const embed = new MessageEmbed()
        embed.setColor('#abe9b3')
        embed.setTitle(`${track.title}`)
        embed.setURL(`${track.url}`)
        embed.setAuthor(`Added to Queue! 🎶 (${musicStreaming})`)
        embed.setDescription(`By ${track.author}`)
        embed.setImage(`https://img.youtube.com/vi/${track.videoId}/maxresdefault.jpg`)
        embed.setTimestamp()
        embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
        interaction.editReply({ embeds: [embed] });
    } catch (error) {
        console.warn(error);
        const embed = new MessageEmbed()
        embed.setColor('#f28fad')
        embed.setTitle(`Failed to play track!`)
        embed.setAuthor('Error! ❌')
        embed.setDescription(`${error}`)
        embed.setTimestamp()
        embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
        interaction.editReply({ embeds: [embed] });
    }
}

export async function leave (interaction: any){
    let subscription = subscriptions.get(interaction.guildId);
    if (subscription) {
        subscription.voiceConnection.destroy();
        subscriptions.delete(interaction.guildId);
        interaction.reply("👋")
    } else {
        await interaction.reply('Wait, I\'m not playing anything in this server! 🤷‍♂️');
    }
}

export async function skip (interaction: any){
    let subscription = subscriptions.get(interaction.guildId);
    if (subscription) {
        subscription.audioPlayer.stop();
        interaction.reply("⏭")
    } else {
        await interaction.reply('Wait, I\'m not playing anything in this server! 🤷‍♂️');
    }
}

export async function queue (interaction: any){
    let subscription = subscriptions.get(interaction.guildId);
    if (subscription) {
        const current =
            subscription.audioPlayer.state.status === AudioPlayerStatus.Idle
                ? `Nothing is currently playing!`
                : `${(subscription.audioPlayer.state.resource as AudioResource<Track>).metadata.title}`;

        const currentUrl =
            subscription.audioPlayer.state.status === AudioPlayerStatus.Idle
                ? null
                : `${(subscription.audioPlayer.state.resource as AudioResource<Track>).metadata.url}`;

        const queue = subscription.queue
            .slice(0, 20)
            .map((track, index) => `${index + 1}) ${track.title}`)
            .join('\n');

        const embed = new MessageEmbed()
        embed.setColor('#96cdfb')
        embed.setTitle(`${current}`)
        embed.setURL(`${currentUrl}`)
        embed.setAuthor('Queue 📃')
        if (`${queue}` === "") {
            embed.setDescription(`Server queue is Empty! What should we play next? 🤷‍♂️`)
        } else {
            embed.setDescription(`**(${Object.keys(subscription.queue).length}) Upcomming next:**\n${queue}`)
        }
        embed.setTimestamp()
        embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
        interaction.editReply({ embeds: [embed] });
    } else {
        await interaction.editReply('Noting is playing in this server! 🤷‍♂️');
    }
}

export async function pause (interaction: any){
    let subscription = subscriptions.get(interaction.guildId);
    if (subscription) {
        subscription.audioPlayer.pause();
        interaction.reply("⏸")
    } else {
        await interaction.reply('Wait, I\'m not playing anything in this server! 🤷‍♂️');
    }
}

export async function resume (interaction: any){
    let subscription = subscriptions.get(interaction.guildId);
    if (subscription) {
        subscription.audioPlayer.unpause();
        interaction.reply("▶")
    } else {
        await interaction.reply('Wait, I\'m not playing anything in this server! 🤷‍♂️');
    }
}

export async function nowplaying (interaction: any){
    let subscription = subscriptions.get(interaction.guildId);
    if (subscription) {
        const current =
            subscription.audioPlayer.state.status === AudioPlayerStatus.Idle
                ? `Nothing is currently playing!`
                : `${(subscription.audioPlayer.state.resource as AudioResource<Track>).metadata.title}`;

        const currentUrl =
            subscription.audioPlayer.state.status === AudioPlayerStatus.Idle
                ? null
                : `${(subscription.audioPlayer.state.resource as AudioResource<Track>).metadata.url}`;

        const currentId =
        subscription.audioPlayer.state.status === AudioPlayerStatus.Idle
            ? null
            : `${(subscription.audioPlayer.state.resource as AudioResource<Track>).metadata.videoId}`;

        const currentAuthor =
        subscription.audioPlayer.state.status === AudioPlayerStatus.Idle
            ? null
            : `${(subscription.audioPlayer.state.resource as AudioResource<Track>).metadata.author}`;

        const embed = new MessageEmbed()
        embed.setColor('#96cdfb')
        embed.setTitle(`${current}`)
        embed.setURL(`${currentUrl}`)
        embed.setAuthor('Now playing 📃')
        embed.setDescription(`By ${currentAuthor}`)
        embed.setImage(`https://img.youtube.com/vi/${currentId}/maxresdefault.jpg`)
        embed.setTimestamp()
        embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
        interaction.editReply({ embeds: [embed] });
    } else {
        await interaction.editReply('Noting is playing in this server! 🤷‍♂️');
    }
}

export async function playlist(interaction: any, playlistUrl: any) {
    let subscription = subscriptions.get(interaction.guildId);

    if (!subscription) {
        if (interaction.member instanceof GuildMember && interaction.member.voice.channel) {
            const channel = interaction.member.voice.channel;
            subscription = new MusicSubscription(
                joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                }),
            );
            subscription.voiceConnection.on('error', console.warn);
            subscriptions.set(interaction.guildId, subscription);
        }
    }

    if (!subscription) {
        await interaction.editReply('Join Voice Channel to Get Started! 🎶');
        return;
    }

    try {
        await entersState(subscription.voiceConnection, VoiceConnectionStatus.Ready, 20e3);
    } catch (error) {
        console.warn(error);
        const embed = new MessageEmbed()
        embed.setColor('#f28fad')
        embed.setTitle(`Failed to join Voice Channel!`)
        embed.setAuthor('Error! ❌')
        embed.setDescription(`${error}`)
        embed.setTimestamp()
        embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
        interaction.editReply({ embeds: [embed] });
        return;
    }

    try {
        const playlist = await ytpl(playlistUrl);
        for (const video of playlist.items) {
            console.log(`Adding ${video.title} to queue!`)
            const track = await Track.from(video.shortUrl, {
                onStart() {
                    console.log(`Now playing ${track.title}`)
                },
                onFinish() {
                    console.log(`Now finished ${track.title}`)
                },
                onError(error) {
                    console.warn(error);
                    const embed = new MessageEmbed()
                    embed.setColor('#f28fad')
                    embed.setTitle(`Error code:`)
                    embed.setAuthor('Error! ❌')
                    embed.setDescription(`${error}`)
                    embed.setTimestamp()
                    embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
                    interaction.editReply({ embeds: [embed] });
                },
            });
            await subscription.enqueue(track);
        }
        const embed = new MessageEmbed()
        embed.setColor('#abe9b3')
        embed.setTitle(`${playlist.title}`)
        embed.setURL(`${playlistUrl}`)
        embed.setAuthor(`Added to Queue! 🎶 (Youtube Playlist)`)
        embed.setDescription(`**By ${playlist.author.name}**\nUse "queue to see Playlist!\nNote: Playlist limit is 100 videos!`)
        embed.setImage(`https://img.youtube.com/vi/${playlist.items[1].id}/maxresdefault.jpg`)
        embed.setTimestamp()
        embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
        interaction.editReply({ embeds: [embed] });
        
    } catch (error) {
        console.warn(error);
        const embed = new MessageEmbed()
        embed.setColor('#f28fad')
        embed.setTitle(`Failed to play track!`)
        embed.setAuthor('Error! ❌')
        embed.setDescription(`${error}`)
        embed.setTimestamp()
        embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
        interaction.editReply({ embeds: [embed] });
    }
}

export async function playlistSpotify(interaction: any, playlistUrl: any) {
    let subscription = subscriptions.get(interaction.guildId);

    if (!subscription) {
        if (interaction.member instanceof GuildMember && interaction.member.voice.channel) {
            const channel = interaction.member.voice.channel;
            subscription = new MusicSubscription(
                joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                }),
            );
            subscription.voiceConnection.on('error', console.warn);
            subscriptions.set(interaction.guildId, subscription);
        }
    }

    if (!subscription) {
        await interaction.editReply('Join Voice Channel to Get Started! 🎶');
        return;
    }

    try {
        await entersState(subscription.voiceConnection, VoiceConnectionStatus.Ready, 20e3);
    } catch (error) {
        console.warn(error);
        const embed = new MessageEmbed()
        embed.setColor('#f28fad')
        embed.setTitle(`Failed to join Voice Channel!`)
        embed.setAuthor('Error! ❌')
        embed.setDescription(`${error}`)
        embed.setTimestamp()
        embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
        interaction.editReply({ embeds: [embed] });
        return;
    }

    try {
        spotifyToYT.playListGet(playlistUrl).then(async (playlist: any) => {
            for (const video of playlist.songs) {
                console.log(`Adding ${video} to queue!`)
                const track = await Track.from(video, {
                    onStart() {
                        console.log(`Now playing ${track.title}`)
                    },
                    onFinish() {
                        console.log(`Now finished ${track.title}`)
                    },
                    onError(error) {
                        console.warn(error);
                        const embed = new MessageEmbed()
                        embed.setColor('#f28fad')
                        embed.setTitle(`Error code:`)
                        embed.setAuthor('Error! ❌')
                        embed.setDescription(`${error}`)
                        embed.setTimestamp()
                        embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
                        interaction.editReply({ embeds: [embed] });
                    },
                });
                await subscription?.enqueue(track);
            }
            const embed = new MessageEmbed()
            embed.setColor('#abe9b3')
            embed.setTitle(`${playlist.info.name}`)
            embed.setURL(`${playlistUrl}`)
            embed.setAuthor(`Added to Queue! 🎶 (Spotify Playlist)`)
            embed.setDescription(`**By ${playlist.info.owner.display_name}**\nUse "queue to see Playlist!\nNote: Playlist limit is 100 videos!`)
            const firstVideoID = await youtubedl(playlist.songs[1], {
                defaultSearch: "auto",
                getId: "",
              }).then((output: any) => {
                return output
              })
            embed.setImage(`https://img.youtube.com/vi/${firstVideoID}/maxresdefault.jpg`)
            embed.setTimestamp()
            embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
            interaction.editReply({ embeds: [embed] })
            console.log(playlist.info.images)
        })
        
    } catch (error) {
        console.warn(error);
        const embed = new MessageEmbed()
        embed.setColor('#f28fad')
        embed.setTitle(`Failed to play track!`)
        embed.setAuthor('Error! ❌')
        embed.setDescription(`${error}`)
        embed.setTimestamp()
        embed.setFooter('Cozmo', "https://media.discordapp.net/attachments/959692896720797736/959693526092906506/pfp-png.png");
        interaction.editReply({ embeds: [embed] });
    }
}
