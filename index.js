const Discord = require("discord.js");

const fs = require("fs");
const client = new Discord.Client({
    shards: "auto",
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_BANS',
        'GUILD_INTEGRATIONS',
        'GUILD_WEBHOOKS',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_PRESENCES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGE_TYPING',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS',
        'DIRECT_MESSAGE_TYPING'
    ]
})
client.commands = new Discord.Collection();
client.config = require('./ayarlar.json');

fs.readdir("./handler", function(err, files) {
    if(err) throw err;
    files.forEach(file => {
        require("./handler/" + file)(client);

        console.log(file + " handler loaded.")
    })
})

require('./events/message.js')(client);
client.login(client.config.token)