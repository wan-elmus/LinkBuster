# Brief Description of what the Darn Bot does:

It uses the Slack RTM API to listen for messages in a specific channel, and when a message that includes a link is detected, it checks if the user who sent the message is banned or has been warned before. If the user is banned, the bot sends a message to the channel indicating that the user is banned. If the user has been warned before, the bot bans the user and sends a message to the channel indicating that the user is banned. If the user has not been warned before, the bot sends a warning message to the user.

This code uses three data structures to keep track of warned and banned users:

A set called "bannedUsers" to keep track of banned users.
A map called "warnedUsers" to keep track of warned users, with the key being the user's ID and the value being the timestamp of the warning.
A function  *hasBeenWarned*  which checks if a user has already been warned.
A function  *isBanned*  which checks if a user has been banned.
A function  *warnUser*  which adds a user to the warnedUsers map.
A function  *clearWarning*  which removes a user from the warnedUsers map.
A function   *banUser*  which obscures the User from accessing the channel for a week.


Steps to deploy the Bot in the Slack channel

For this case, there is an existing channel called "meme-ology" in ALX Slack workspace.

To be able to use the bot for any Slack channel, obtain the channel ID of the channel. You can use the Slack WebClient API *conversations.list* method to retrieve the list of all channels in the workspace, then find the channel with the desired name and get its ID.

Update the bot's code to use the channel ID of the "meme-ology" channel. The hard-coded channel name "memeology" can be replaced by the ID of the desired channel.

Deploy the damn bot: Once the bot's code is set up, it can be deployed to a server or hosting platform. There are many options available, such as Heroku, AWS, Google Cloud, and more.

Invite the *reaper* bot to the "meme-ology" channel or your desired channel. You can use the Slack WebClient API *conversations.invite* method to invite the bot in the channel.

Test bot by sending messages with links, it should be able to respond accordingly.

Also, you can use the Slack's Event Subscriptions and Slack's Bot functionality to deploy your bot, they will allow you to listen to the events on your channel and respond to them, also you can use Slack's Block Kit to make your bot's messages more interactive.
