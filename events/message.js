module.exports = async(client) => {
    client.on('messageCreate', msg => {

        let command = msg.content.split(' ')[0].slice('!'.length);
        let args = msg.content.split(' ').slice('!'.length);
        if(client.commands.get(command) != null) {
            msg.channel.sendTyping();
            let cmd = client.commands.get(command);
            cmd.run(client, msg, args)
        }
    })
}