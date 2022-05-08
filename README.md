
# Inactivity Check Discord Bot
Here is simple bot of mine that will list or bans users that didn't send anything in channel that the command is used. Good for keeping active users and kicking the idling ones.

What exacly it does?

1. Makes a list of messages in channel
2. Gets all user ids of messages

Then, for that list:

1. Checks if user is on whitelist, if not continue
2. Checks if user is a bot, if not continue
3. Sends a message with an invite to rejoin. (one-time use, infinite lifespan, every invite is uniqe)
4. Kicks form server.

**BE SURE TO ENABLE FOLLOW THE [WIKI](https://github.com/ThePhaseless/Inactivity-check-Discord-Bot/wiki) TUTORIAL**

Best to fork it on [Repl.it](https://replit.com/@ThePhaseless/Inactivity-check-Discord-Bot)

*Templates taken from and inspired by Discord.js*
