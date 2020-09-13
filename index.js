const Discord = require('discord.js');
const client = new Discord.Client();
const {Client, Attachment, MessageEmbed} = require('discord.js');

const token = 'YOUR TOKEN';

const ver = '2.1.1!'

var prefix = ';';

streamersname = [];
streamersurl = [];

client.on('ready', () => {
    console.log('This bot is online!')
    client.user.setActivity(";help")
})

client.on('message', msg=>{

    let args = msg.content.substring(prefix.length).split(" ");

    if(msg.content.startsWith(prefix)){
        var embed = new Discord.MessageEmbed()
        switch(args[0].toLowerCase()){
            case 'adds':
                if(streamersurl.indexOf(args[1]) == -1 && typeof(args[1]) !== 'undefined'){
                    if(args[1].includes('https://www.twitch.tv/')){
                        let stuff =  args[1].substring(0).split("/")
                        streamersname.push(stuff[stuff.indexOf('www.twitch.tv') + 1])
                        streamersurl.push(args[1].toLowerCase())
                        embed.setColor('#8e44ad')
                        embed.setTitle("streamer sucsessfully added!")
                        embed.setDescription("do " + prefix + "streamers for a list of streamers")
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        msg.channel.send(embed)
                    }else{
                        embed.setTitle("Error")
                        embed.setDescription("invalid Twitch URL")
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        embed.setColor('#8e44ad')
                        msg.channel.send(embed)
                    }
                }else{
                    embed.setColor('#8e44ad')
                    embed.setTitle("Error")
                    embed.addFields(
                        {name:"An error has occurred", value:"do " + prefix + "addshelp to get help with this command"}
                    )
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                    return;
                }
            break;
            case 'streamers':
                if(streamersurl.length == 0){
                    embed.setColor('#8e44ad')
                    embed.setTitle("Please add some streamers first!")
                    embed.setDescription("do " + prefix + "addshelp for more help")
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                    return;
                }
                message = '';
                for(x = 0; x < streamersname.length; x++){
                    embed.addFields(
                        {name:streamersname[x], value:streamersurl[x]}
                    )
                }
                embed.setColor('#8e44ad')
                embed.setTitle("The currently added streamers are\n")
                embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                msg.channel.send(embed);
            break;
            case 'prefix':
                if(args.length == 2){
                    if(args[1].length > 2){
                        embed.setColor('#8e44ad')
                        embed.setTitle("Prefix to long!")
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        msg.channel.send(embed)
                        return;
                    }
                    prefix = args[1];
                    embed.setColor('#8e44ad')
                    embed.setTitle('The Prefix was set to ' + prefix)
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed);
                }else if(args.length == 1){
                    embed.setColor('#8e44ad')
                    embed.setTitle("the prefix is" + prefix)
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                }else{ 
                  embed.setColor('#8e44ad')
                  embed.setTitle("unknown use of command prefix")
                  embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                }
            break;
            case 'addshelp':
                embed.setColor('#8e44ad')
                embed.setTitle("Adds commands")
                embed.addFields(
                    {name:"How to use " + prefix + "adds:", value:prefix + "adds <linktostreamer>"},
                    {name:"How to use " + prefix + "streamers", value:prefix + "should return a list of all added streamers"},
                    {name:"How to use " + prefix + "delstreamer", value:prefix + "delstreamer <streamername> if you do this command you should be able to delete the streamer from your list"},
                    {name:"How to use " + prefix + "renamestreamer", value:prefix + "renamestreamer <current streamer name> <new streamer name> should rename the streamer in the list"}
                )
                embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                msg.reply(embed);
            break;
            case 'renamestreamer':
                if(args.length == 3){
                    streamersname[streamersname.indexOf(args[1])] = args[2]
                    embed.setColor('#8e44ad')
                    embed.setTitle("Streamer successfully renamed!")
                    embed.setDescription("do " + prefix + "streamers for a list of streamers")
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                }else{
                    embed.setColor('#8e44ad')
                    embed.setTitle("Error")
                    embed.setDescription("do " + prefix + "addshelp for help with this command")
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                }
            break;
            case 'delstreamer':
                if(streamersname.indexOf(args[1].toLowerCase()) != -1){
                    streamersurl.splice(streamersname.indexOf(args[1].toLowerCase()),1)
                    streamersname.splice(streamersname.indexOf(args[1].toLowerCase()),1)
                    embed.setColor('#8e44ad')
                    embed.setTitle("Streamer successfully removed!")
                    embed.setDescription("do " + prefix + "streamers for a list of streamers")
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                }else{
                    embed.setColor('#8e44ad')
                    embed.setTitle("Streamer does not exsist!")
                    embed.setDescription("do " + prefix + "streamers for a list of streamers")
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    embed.setFooter("do " + prefix + "addshelp for help with this command")
                    msg.channel.send(embed)
                }
            break;
            case 'help':
                embed.setColor('#8e44ad')
                embed.setTitle("Commands")
                embed.addFields(
                    {name:prefix + "adds", value:"This command goes into alot more depth do " + prefix + "addshelp to get more info"},
                    {name:prefix + "prefix + [anything]", value:"this command will set the server prefix to what you say (the prefix can not be longer than 2 letter"},
                    {name:prefix + "bug", value:"This will give you the link to the form where you can report bugs/request features"},
                    {name:prefix + "source", value:"This will give you the link to the source code (the code will not always be up to date)"},
                )
                embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                msg.channel.send(embed);
                return;            
            break;
            case 'dev':
                embed.setColor('#8e44ad')
                embed.setTitle("This is just for the dev if you find this")
                embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                embed.addFields(
                    {name:"Version", value:ver},
                    {name:"uptime", value:client.uptime/1000}
                )
                msg.channel.send(embed);
            break;
            case 'bug':
                embed.setColor('#8e44ad')
                embed.setTitle("Bug report form")
                embed.setDescription("The form for reporting bugs is in the title")
                embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                embed.setURL("https://forms.gle/Wm3UWzhBMXGcMTVA7")
                msg.channel.send(embed);
            break;
            case 'source':
                embed.setColor('#8e44ad')
                embed.setTitle("Bot source code")
                embed.setDescription("Source code for the bot")
                embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                embed.setURL("https://github.com/masonh627/discord-bot")
                msg.channel.send(embed);
            break;
        }
    }
    if(msg.content.startsWith(';') && args[0] == 'elp'){
        embed.setColor('#8e44ad')
        embed.setTitle("Commands")
        embed.addFields(
            {name:prefix + "adds", value:"This command goes into alot more depth do " + prefix + "addshelp to get more info"},
            {name:prefix + "prefix + [anything]", value:"this command will set the server prefix to what you say (the prefix can not be longer than 2 letter"},
            {name:prefix + "bug", value:"This will give you the link to the form where you can report bugs/request features"},
            {name:prefix + "source", value:"This will give you the link to the source code (the code will not always be up to date)"},
        )
        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
        msg.channel.send(embed);           
    }
})

client.login(token);
