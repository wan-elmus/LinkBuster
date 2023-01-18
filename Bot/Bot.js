// LinkBuster

import { RTMClient } from '@slack/rtm-api';
const token = 'SLACK_BOT_TOKEN';

const rtm = new RTMClient(token);
rtm.start();

const bannedUsers = new Set();
const warnedUsers = new Map();

// check if a user has already been warned
const hasBeenWarned = (userId) => warnedUsers.has(userId);

// check if a user has been banned
const isBanned = (userId) => bannedUsers.has(userId);

// add a user to the warnedUsers map
const warnUser = (userId) => warnedUsers.set(userId, Date.now());

// remove a user from the warnedUsers map
const clearWarning = (userId) => warnedUsers.delete(userId);

// function to ban a user for 7 days
const banUser = (userId) => {
    bannedUsers.add(userId);
    setTimeout(() => bannedUsers.delete(userId), 7 * 24 * 60 * 60 * 1000);
};

// listen for message events
rtm.on('message', async (event) => {
    // check if the message is in the meme-ology channel
    if (event.channel === 'meme-ology') { //Here the hardcoded channel name can be replaced by any channel's iID
        // check if the message includes a link
        if (event.text.includes('http') || event.text.includes('www')) {
            // get the user's id and username
            const userId = event.user;
            const user = await rtm.webClient.users.info({ user: userId });
            const username = user.user.name;

            // check if the link is from LinkedIn, GitHub, or Twitter

            const linkedInUrls = ["linkedin.com", "www.linkedin.com"];
            const githubUrls = ["github.com", "www.github.com"];
            const twitterUrls = ["twitter.com", "www.twitter.com"];
            var links = event.text.split(" ");
            var flag = false;
            for(var i = 0; i < links.length; i++){
                if(linkedInUrls.includes(links[i].split(".")[1]) || githubUrls.includes(links[i].split(".")[1]) || twitterUrls.includes(links[i].split(".")[1])){
                    flag = true;
                    break;
                }
            }
            if(flag){
                if (isBanned(userId)) {
                    rtm.sendMessage(`Sorry, <@${userId}> you are banned from posting links on this channel for 7 days`, event.channel);
                    return;
                }
                if (hasBeenWarned(userId)) {
                    rtm.sendMessage(`Sorry, <@${userId}> you are banned from posting links on this channel for 7 days`, event.channel);
                    banUser(userId);
                    clearWarning(userId);
                    return;
                }
                rtm.sendMessage(`<@${userId}> please refrain from posting links on this channel. Next time you will be banned for 7 days`, event.channel);
                warnUser(userId);
            }
        }
    }
});
