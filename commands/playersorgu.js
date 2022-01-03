const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'oyuncusorgı',
    aliases: ['os', 'oyuncu-sorgu'],
    run: async(client, message, args) => {
        
        if(args[0] == null) return message.reply({content:'Lütfen bir oyuncu adı giriniz.'})
        const url = client.config.api_url + "/apps/api/credit-history.php?username=" + args[0];
        fetch(url)
            .then(response => response.json())
            .then((res) => {
                const player = res[0];
                const embed = new Discord.MessageEmbed({
                    title: 'Oyuncu sorgu',
                    description: `
🧑 Oyuncu:
> ${player.username}

💰 Kredi:
> ${player.amount}

📍 Oluşturulma tarihi:
> ${player.creationDate}

🆔 Hesap ID:
> ${player.accountID}
                    `,
                    footer: {text: 'LeaderOS Bot v1.0, Site: ' + client.config.api_url},
                    color: 'ORANGE',
                    thumbnail: 'https://mcapi.tc/?'+client.config.ip+'/favicon'
                })
                message.reply({embeds: [embed]})
            })
            .catch((err) => {
                message.reply({content:`Veritabanında \`${args[0]}\` adlı kişiyi bulamıyorum.`})
            })
    }
}
