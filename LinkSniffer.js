const { RTMClient } = require('@slack/rtm-api');
const token = 'SLACK_BOT_TOKEN';

const rtm = new RTMClient(token);
rtm.start();

const bannedUsers = new Map();
const warnedUsers = new Map();

// check if a user has already been warned
const hasBeenWarned = (userId) => warnedUsers.has(userId);

// check if a user has been banned
const isBanned = (userId) => bannedUsers.has(userId);

// add a user to the warnedUsers map
const warnUser = (userId, channel) => {
    warnedUsers.set(userId, {time: Date.now(), channel});
};

// remove a user from the warnedUsers map
const clearWarning = (userId) => warnedUsers.delete(userId);

// function to ban a user for 7 days
const banUser = (userId, channel) => {
    const ban = {
        time: Date.now(),
        channel,
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000
    }
    bannedUsers.set(userId, ban);
};

const unbanUser = (userId) => {
    bannedUsers.delete(userId);
};

// listen for message events
rtm.on('message', async (event) => {
    // check if the message is in the meme-ology channel
    if (event.channel === 'meme-ology') { //Can listen to any channel with proper provided Channel ID
        // check if the message includes a command
        if (event.text.startsWith('!banstatus')) {
            const userId = event.text.split(' ')[1];
            if (isBanned(userId)) {
                const ban = bannedUsers.get(userId);
                rtm.sendMessage(`User <@${userId}> is banned from posting links on this channel until ${new Date(ban.expire)}`, event.channel);
                return;
            }
            if (hasBeenWarned(userId)) {
                const warning = warnedUsers.get(userId);
                rtm.sendMessage(`User <@${userId}> has been warned on channel ${warning.channel} at ${new Date(warning.time)}`, event.channel);
                return;
            }
            rtm.sendMessage(`User <@${userId}> has not been warned or banned`, event.channel);
            return;
        }
        if (event.text.startsWith('!unban')) {
            const userId = event.text.split(' ')[1];
            if (isBanned(userId)) {
                unbanUser(userId);
                rtm.sendMessage(`User <@${userId}> has been unbanned`, event.channel);
                return;
            }
            rtm.sendMessage(`User <@${userId}> is not banned`, event.channel);
            return;
        }

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

