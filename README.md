# Discord Gemini Bot - Overview

A Discord Bot that uses slash commands to invoke Google's Generative AI Model - Gemini, via its API.<br/>
<br/>
![Gemini-bot-demonstration](https://github.com/MD-1909/Discord-Gemini-Bot/assets/46313081/36c25807-87b5-421b-966e-53f24e84631a)

## Requirements

- Node.js
- Discord Account
- A Google Account

## Setting up the project locally

### NodeJS and Repository setup

#### Clone the repository and open it in a code editor of your choice

```
https://github.com/MD-1909/DiscordGeminiBot.git
```

#### Install dependencies

```
npm install
```

#### Generate a new Gemini API key

Navigate to [API Keys](https://aistudio.google.com/app/apikey) and generate a new one, then copy it to the .env file in your local copy of the repo.  
<br>

### Discord Setup

#### Create a new Discord Server of your own

[Step-by-step guide if you're not familiar with the process](https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server-)

#### Create a new Discord bot

1. Navigate to [discord.com/developers](https://discord.com/developers/applications).
2. Click on 'New Application' in the top right corner.
3. Name it whatever you want, just ensure that the name does not contain the word 'Discord' in it.
4. Accept the T&C and click on Create.
5. Customise the Avatar or description if you want to.
6. Navigate to the Bot tab from the navigation bar on the left.
7. Click on 'Add Bot'.
8. Reset the token to generate a new one and copy it to the .env file in the local copy of the repository.
9. Scroll down to 'Privileged Gateway Intents' and turn on the 'Message Content Intent' option.
10. Save your changes.
11. Navigate to the 'Installation' tab.
12. Select 'Guild Install' under Authorization Methods.
13. Select 'Discord Provided Link' from the next dropdown
14. Under 'Default Install Settings' add 'application.commands' and 'bot' in the 'Scopes' section and 'Administrator' in the 'Permissions' section.
15. Now scroll up and copy the auto-generated URL.
16. After the '=' paste your client id that is visible under 'Client information' on the same screen.
17. Open it in a new tab. You should be seeing a window like this <br/>
    <br/>![Bot_Invite](https://github.com/MD-1909/Discord-Gemini-Bot/assets/46313081/029160ab-5e1b-49f9-ac65-bf6d863e961e)
18. Select your server from the dropdown and click 'Continue' -> 'Authorise'.
19. Complete the Captcha and the bot should now be a part of your server.

## Usage

Run the following command to register the slash command for your bot: 
<br/>(This is a one-time step and only needs to be repeated if you add a new command)

```
node ./utils/deployCommands.js
```

Then run the following command to start the bot:

```
node ./index.js
```

You will get a message saying 'Gemini is online...' if all goes well.<br/>
Open any text channel in your Discord Server and type `/` to bring up all the application commands.<br/>
`/query` is used to send a prompt to Gemini.<br/>
`/save` is used to resend the last response and save it in the chat, since all the replies of the query command are ephemeral.<br/>
After a couple of seconds, the bot should provide you with a reply.<br/>
Done! Happy Hacking!
<br/>
