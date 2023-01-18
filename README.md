# Modifications that can be added to the bot

Include an option for users to appeal their ban: Users who have been banned can send a message to the bot to appeal their ban, and the bot can forward the message to a designated moderator for review.

Add option for moderators to check the number of warnings or bans issued: Moderators can check the number of warnings or bans issued to specific users or in general.

Add an option for moderators to unban users: Moderators can unban users who have been banned.

Include option for the bot to automatically unban users after a certain period of time: Instead of having a moderator unban users, the bot can automatically unban users after a certain period of time.

Include bot function to notify users when their ban is about to expire: The bot can notify users when their ban is about to expire, so they know when they will be able to post links again.

Include an option for the bot to notify the channel when a user has been banned or warned: The bot can notify the channel when a user has been banned or warned, so other users are aware of the situation.

This is the best Mod: option for the bot to automatically delete links: Instead of banning or warning users, the bot can automatically delete links that are posted in the channel.

## Details to obtain the token and deploy the code in slack channel

No need if you already got the app - Create a new Slack app: Go to <https://api.slack.com/apps> and create a new app. Give it a name and select the workspace that you want to use it in.

Obtain a bot token: Once you've created your app, navigate to the "Bot Users" section in the sidebar and add a new bot user. You will then be provided with a bot token that you can use to authenticate your bot with the Slack API. Replace SLACK_BOT_TOKEN in the code with the bot token obtained.

Install the necessary dependencies: This code uses the @slack/rtm-api library, so it's a must to have it installed in your project. You can do this by running npm install @slack/rtm-api or yarn add @slack/rtm-api in your terminal.

Start the bot: Once you've set up the bot token and installed the necessary dependencies, you can start the bot by running the code. The bot will connect to Slack and begin listening for events.

Add the bot to a channel: You'll need to invite the bot to the channel that you want it to listen to. You can do this by going to the channel in Slack, typing "@" followed by the bot's name, and selecting the bot from the list of suggestions.

Test the bot: You can test the bot by sending a message in the channel that starts with "!banstatus" or "!unban" and also by posting a link, the bot should respond accordingly.

Deploy the code: To deploy the code, you will need to host it on a server that is always running and accessible to the internet. There are many ways to do this, such as using Heroku or AWS. You will also need to set up a way to automatically restart the bot if it crashes or the server is rebooted.

Keep the token safe: Keep the token secret and never share it with anyone. If you think the token has been compromised, you can always regenerate it on the app management page.
