const Discord = require('discord.js');
const client = new Discord.Client();
const {Client, Attachment, MessageEmbed} = require('discord.js');

const token = 'YOUR TOKEN';

const ver = '2.0.0!'

var prefix = ';';

streamersname = [];
streamersurl = [];

client.on('ready', () => {
    console.log('This bot is online!')
    client.user.setActivity(";help")
})

client.on('message', msg=>{

    let args = msg.content.substring(prefix.length).split(" ");
    var embed = new Discord.MessageEmbed()

    if(msg.content.startsWith(prefix)){
        switch(args[0]){
            case 'adds':
                console.log[0]
                console.log[1]
                console.log[2]
                if(streamersurl.indexOf(args[2]) == -1 && args.length == 3){
                    streamersname.push(args[1])
                    streamersurl.push(args[2])
                    var embed = new Discord.MessageEmbed()
                    .setColor('#8e44ad')
                    .setTitle("streamer sucsessfully added!")
                    .setFooter("do " + prefix + "streamers for a list of streamers")
                    .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                }else{
                    var embed = new Discord.MessageEmbed()
                    .setColor('#8e44ad')
                    .setTitle("Error")
                    .addFields(
                        {name:"An error has occurred", value:"do " + prefix + "addshelp to get help with this command"}
                    )
                    .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                    return;
                }
            break;
            case 'streamers':
                if(streamersurl.length == 0){
                    var embed = new Discord.MessageEmbed()
                    .setColor('#8e44ad')
                    .setTitle("Please add some streamers first!")
                    .setFooter("do " + prefix + "addshelp for more help")
                    .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                    return;
                }
                message = '';
                for(x = 0; x < streamersname.length; x++){
                    message += x + ". " + streamersname[x] + "\n"
                }
                var embed = new Discord.MessageEmbed()
                .setColor('#8e44ad')
                .setTitle("The currently added streamers are\n")
                .addFields(
                    {name:"Streamers", value:message, inline:true}
                )
                .setFooter("to get all the urls of the streamers do " + prefix + "streamersurl to get a dm with a list of them\n")
                .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                msg.channel.send(embed);
            break;
            case 'streamersurl':
                if(streamersurl.length == 0){
                    var embed = new Discord.MessageEmbed()
                    .setColor('#8e44ad')
                    .setTitle("Please add some streamers first!")
                    .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                    return;
                }
                message = ''
                for(x = 0; x <streamersurl.length; x++){
                    message += x + ". " + streamersurl[x] + "\n"
                }
                var embed = new Discord.MessageEmbed()
                .setColor('#8e44ad')
                .setTitle("The currently added streamer urls are")
                .addFields(
                    {name:"Streamers", value:message, inline:true}
                )
                .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                msg.author.send(embed)
            break;
            case 'prefix':
                if(args.length == 2){
                    if(args[1].length > 2){
                        var embed = new Discord.MessageEmbed()
                        .setColor('#8e44ad')
                        .setTitle("Prefix to long!")
                        .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        msg.channel.send(embed)
                        return;
                    }
                    prefix = args[1];
                    var embed = new Discord.MessageEmbed()
                    .setColor('#8e44ad')
                    .setTitle('The Prefix was set to ' + prefix)
                    .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed);
                }else if(args.length == 1){
                    var embed = new Discord.MessageEmbed()
                    .setColor('#8e44ad')
                    .setTitle("the prefix is" + prefix)
                    .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                }else{
                    var embed = new Discord.MessageEmbed()
                    .setColor('#8e44ad')
                    .setTitle("unknown use of command prefix")
                    .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                }
            break;
            case 'addshelp':
                var embed = new Discord.MessageEmbed()
                .setColor('#8e44ad')
                .setTitle("Adds commands")
                .addFields(
                    {name:"How to use adds:", value:prefix + "adds <streamername> <linktostreamer>"},
                    {name:"How to use streamers", value:prefix + "should return a list of all added streamers"},
                    {name:"How to use streamersurl", value:prefix + "should dm a list of all added streamer urls"}
                )
                .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                msg.reply(embed);
            break;
            case 'help':
                var embed = new Discord.MessageEmbed()
                .setColor('#8e44ad')
                .setTitle("Commands")
                .addFields(
                    {name:prefix + "adds", value:"This command goes into alot more depth do " + prefix + "addshelp to get more info"},
                    {name:prefix + "prefix + [anything]", value:"this command will set the server prefix to what you say (the prefix can not be longer than 2 letter"},
                    {name:prefix + "bug", value:"This will give you the link to the form where you can report bugs/request features"},
                    {name:prefix + "source", value:"This will give you the link to the source code (the code will not always be up to date)"},
                )
                .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                msg.channel.send(embed);
                return;            
            break;
            case 'dev':
                var embed = new Discord.MessageEmbed()
                .setColor('#8e44ad')
                .setTitle("This is just for the dev if you find this")
                .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                .addFields(
                    {name:"Version", value:ver},
                    {name:"uptime", value:client.uptime/1000}
                )
                msg.channel.send(embed);
            break;
            case 'bug':
                var embed = new Discord.MessageEmbed()
                .setColor('#8e44ad')
                .setTitle("Bug report form")
                .setDescription("The form for reporting bugs is in the title")
                .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                .setURL("https://forms.gle/Wm3UWzhBMXGcMTVA7")
                msg.channel.send(embed);
            break;
            case 'source':
                var embed = new Discord.MessageEmbed()
                .setColor('#8e44ad')
                .setTitle("Bot source code")
                .setDescription("Source code for the bot")
                .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                .setURL("https://github.com/masonh627/discord-bot")
                msg.channel.send(embed);
            break;
        }
    }
    if(msg.content.startsWith(';') && args[0] == 'elp'){
        var embed = new Discord.MessageEmbed()
        .setColor('#8e44ad')
        .setTitle("Commands")
        .addFields(
            {name:prefix + "adds", value:"This command goes into alot more depth do " + prefix + "addshelp to get more info"},
            {name:prefix + "prefix + [anything]", value:"this command will set the server prefix to what you say (the prefix can not be longer than 2 letter"},
            {name:prefix + "bug", value:"This will give you the link to the form where you can report bugs/request features"},
            {name:prefix + "source", value:"This will give you the link to the source code (the code will not always be up to date)"},
        )
        .setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
        msg.channel.send(embed);           
    }
})

client.login(token);
