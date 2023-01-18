# Brief Description of what the Darn Bot does

It uses the Slack RTM API to listen for messages in a specific channel, and when a message that includes a link is detected, it checks if the user who sent the message is banned or has been warned before. If the user is banned, the bot sends a message to the channel indicating that the user is banned. If the user has been warned before, the bot bans the user and sends a message to the channel indicating that the user is banned. If the user has not been warned before, the bot sends a warning message to the user.

This code uses three data structures to keep track of warned and banned users:

A set called "bannedUsers" to keep track of banned users.
A map called "warnedUsers" to keep track of warned users, with the key being the user's ID and the value being the timestamp of the warning.
A function  *hasBeenWarned*  which checks if a user has already been warned.
A function  *isBanned*  which checks if a user has been banned.
A function  *warnUser*  which adds a user to the warnedUsers map.
A function  *clearWarning*  which removes a user from the warnedUsers map.
A function   *banUser*  which obscures the User from accessing the channel for a week.

## Steps to deploy the Bot in the Slack channel

For this case, there is an existing channel called "meme-ology" in ALX Slack workspace.

To be able to use the bot for any Slack channel, obtain the channel ID of the desired channel. You can use the Slack WebClient API *conversations.list* method to retrieve the list of all channels in the workspace, then find the channel with the desired name and get its ID.

Update the bot's code to use the channel ID of the "meme-ology" channel. The hard-coded channel name "memeology" can be replaced by the ID of the desired channel.

Deploy the darn bot: Once the bot's code is set up, it can be deployed to a server or hosting platform. There are many options available, such as Heroku, AWS, Google Cloud, and more.

Invite the *reaper* bot to the "meme-ology" channel or your desired channel. You can use the Slack WebClient API *conversations.invite* method to invite the bot in the channel.

Test bot by sending messages with links, it should be able to respond accordingly.

Also, you can use the Slack's Event Subscriptions and Slack's Bot functionality to deploy your bot, they will allow you to listen to the events on your channel and respond to them, also you can use Slack's Block Kit to make your bot's messages more interactive.

### Slack Link Dog - LinkSniffer.js

Code imports the Slack Real Time Messaging (RTM) client and creates a new instance of it using a token, which allows the script to connect to Slack and interact with the Slack API. It then starts the RTM client and creates two maps, one for banned users and one for warned users

It defines several functions to interact with the maps, including functions to check if a user has been warned or banned, add or remove a warning for a user, ban a user for 7 days, and unban a user.

Script then listens for message events from the RTM client, and checks if the message is in a specific channel, 'meme-ology' or 'any desired channel'. If the message includes a command, the script will check for specific command like '!banstatus' and '!unban' and will return the status of user whether it is banned or warned or not, and unban the user if the command is '!unban'

The script then checks if the message includes a link, and if it does, it gets the user's ID and username.
