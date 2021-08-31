const client = require('../index.js');
const config = require('../config.json');

client.on('messageCreate', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (!message.member.permissions.has(command.UserPerms || [])) return message.channel.send(`User Dont Have \`${command.UserPerms || []}\` Permissions`)
        if (!message.guild.me.permissions.has(command.ClientPerms || [])) return message.channel.send(`Client missing \`${command.ClientPerms || []}\` Permissions`)
}
    if(command) command.run(client, message, args) 
})
