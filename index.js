const Discord = require('discord.js');
const client = new Discord.Client();
const {Client, Attachment, MessageEmbed} = require('discord.js');
const fs = require("fs")

const token = 'YOUR TOKEN';

const ver = '2.3.0!'

var prefix = ';';

holder = [];
fs.readFile("streamers.txt", "utf8", function(err, data){
    if (err){
        fs.appendFile("streamers.txt", "", function(err){
            if(err) throw(err);
            console.warn("Streamers.txt not found, added file")
        })
        return;
    }
    holder = data.substring(0).split(",")
    for(x=0; x<holder.length-1;x+=2){
        streamersname.push(holder[x])
        streamersurl.push(holder[x+1])
    }
})
holder = [];
fs.readFile("youtubers.txt", "utf8", function(err, data){
    if (err){
        fs.appendFile("youtubers.txt", "", function(err){
            if(err) throw(err);
            console.warn("youtubers.txt not found, added file")
        })
        return;
    }
    holder = data.substring(0).split(",")
    for(x=0; x<holder.length-1;x+=2){
        youtubers.push(holder[x])
        youtubersurl.push(holder[x+1])
    }
})
streamersname = [];
streamersurl = [];
youtubers = [];
youtubersurl = [];

client.on('ready', () => {
    console.log('This bot is online!')
    client.user.setActivity(";help")
})

client.on('message', msg=>{

    let args = msg.content.substring(prefix.length).split(" ");

    if(msg.content.startsWith(prefix)){
        var embed = new Discord.MessageEmbed()
        switch(args[0].toLowerCase()){
            case 'add':
                if(streamersurl.indexOf(args[1]) == -1 && typeof(args[1]) !== 'undefined'){
                    if(args[1].includes('https://www.twitch.tv/') || args[1].includes('https://www.youtube.com/')){
                        if(args[1].includes('https://www.twitch.tv/')){
                            //add new streamer to list
                            let stuff =  args[1].substring(0).split("/")
                            streamersname.push(stuff[stuff.indexOf('www.twitch.tv') + 1])
                            streamersurl.push(args[1].toLowerCase())
                            //write new streamer to file
                            fs.appendFile("streamers.txt", stuff[stuff.indexOf('www.twitch.tv') + 1] + "," + args[1].toLowerCase() + ", ", function(err){
                                if (err) throw err;
                                console.log('added ' + stuff[stuff.indexOf('www.twitch.tv') + 1] + " to the database");
                            })
                            //send message confirming streamer added
                            embed.setColor('#8e44ad')
                            embed.setTitle("streamer sucsessfully added!")
                            embed.setDescription("do " + prefix + "streamers for a list of streamers")
                            embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                            msg.channel.send(embed)
                        }else{
                            if(typeof(args[2]) !== 'undefined' && youtubersurl.indexOf(args[1]) == -1){
                                //add new youtuber to list
                                let stuff =  args[1].substring(0).split("/")
                                streamersname.push(stuff[stuff.indexOf('www.youtube.com') + 1])
                                streamersurl.push(args[1].toLowerCase())
                                //add new youtuber to file
                                fs.appendFile("youtubers.txt", args[2] + "," + args[1].toLowerCase() + ", ", function(err){
                                    if (err) throw err;
                                    console.log('added ' + args[2] + " to the database");
                                })
                                //send message about youtuber being added
                                embed.setColor('#FF0000')
                                embed.setTitle("youtuber sucsessfully added!")
                                embed.setDescription("do " + prefix + "youtubers for a list of youtubers")
                                embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                                msg.channel.send(embed)
                            }else{
                                //error handle if no name for youtuber put in or youtuber exsist
                                if(typeof(args[2]) !== 'undefined'){
                                    embed.setColor('#FF0000')
                                    embed.setTitle("Error")
                                    embed.setDescription("You need to set a name for the youtuber!")
                                    embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                                    msg.channel.send(embed)
                                }else{
                                    embed.setColor('#FF0000')
                                    embed.setTitle("Error")
                                    embed.setDescription("Youtuber already added!")
                                    embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                                    msg.channel.send(embed)
                                }
                            }
                        }
                    }else{
                        //error in urls
                        embed.setTitle("Error")
                        embed.setDescription("invalid URL")
                        embed.addFields(
                            {name:"An error has occurred", value:"do " + prefix + "addhelp to get help with this command"}
                        )
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        embed.setColor('#8e44ad')
                        msg.channel.send(embed)
                    }
                }else{
                    embed.setColor('#8e44ad')
                    embed.setTitle("Error")
                    embed.addFields(
                        {name:"An error has occurred", value:"do " + prefix + "addhelp to get help with this command"}
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
            case 'addhelp':
                embed.setColor('#8e44ad')
                embed.setTitle("Adds commands")
                embed.addFields(
                    {name:"How to use " + prefix + "add:", value:prefix + "add <link to streamer> or " + prefix + "add <link to youtube channel> <name>"},
                    {name:"How to use " + prefix + "streamers", value:prefix + "should return a list of all added streamers"},
                    {name:"How to use " + prefix + "delstreamer", value:prefix + "delstreamer <streamer name> if you do this command you should be able to delete the streamer from your list"},
                    {name:"How to use " + prefix + "renamestreamer", value:prefix + "renamestreamer <current streamer name> <new streamer name> should rename the streamer in the list"},
                    {name:"How to use " + prefix + "youtubers", value:prefix + "youtubers should return a list of all added youtubers"},
                    {name:"How to use " + prefix + "delyoutuber", value:prefix + "delyoutuber <youtuber name> if you do this command you should be able to delete the youtuber from your list"},
                    {name:"How to use " + prefix + "renameyoutuber", value:prefix + "renameyoutuber <current youtuber name> <new youtuber name> should rename the youtuber in the list"},
                )
                embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                msg.reply(embed);
            break;
            case 'renamestreamer':
                //check if command was called right
                if(streamersname.indexOf(args[1].toLowerCase()) != -1 && typeof(args[1]) !== 'undefined' && typeof(args[2]) !== 'undefined'){
                    streamersname[streamersname.indexOf(args[1].toLowerCase())] = args[2]
                    //define file content
                    content = '';
                    for(x=0;x<streamersname.length;x++){
                        content += streamersname[x] + "," + streamersurl[x] + ", "
                    }
                    //write file with new content and log that someone was deleted from data base
                    fs.writeFile("streamers.txt", content, function(err,data){
                        if (err) throw(err)
                        console.log("renamed " + args[1].toLowerCase() + " to " + args[2].toLowerCase())
                    })
                    //send embed
                    embed.setColor('#8e44ad')
                    embed.setTitle("Streamer successfully renamed!")
                    embed.setDescription("do " + prefix + "streamers for a list of streamers")
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                }else{
                    //error handler
                    embed.setColor('#8e44ad')
                    embed.setTitle("Error")
                    embed.setDescription("do " + prefix + "addhelp for help with this command")
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                }
            break;
            case 'renameyoutuber':
                //check if command was called right
                if(youtubers.indexOf(args[1].toLowerCase()) != -1 && typeof(args[1]) !== 'undefined' && typeof(args[2]) !== 'undefined'){
                    youtubers[youtubers.indexOf(args[1].toLowerCase())] = args[2]
                    //make new files content
                    content = '';
                    for(x=0;x<youtubers.length;x++){
                        content += youtubers[x] + "," + youtubersurl[x] + ", "
                    }
                    //write file with new content and log that someone was deleted from data base
                    fs.writeFile("youtubers.txt", content, function(err,data){
                        if (err) throw(err)
                        console.log("Renamed " + args[1].toLowerCase() + " to " + args[2].toLowerCase())
                    })
                    //send embed
                    embed.setColor('#FF0000')
                    embed.setTitle("Youtuber successfully renamed!")
                    embed.setDescription("do " + prefix + "youtubers for a list of youtubers")
                    embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                    msg.channel.send(embed)
                }else{
                    //error handler
                    embed.setColor('#FF0000')
                    embed.setTitle("Error")
                    embed.setDescription("do " + prefix + "addhelp for help with this command")
                    embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                    msg.channel.send(embed)
                }
            break;
            case 'youtubers':
                //check if any youtubers are added
                if(youtubersurl.length == 0){
                    embed.setColor('#FF0000')
                    embed.setTitle("Please add some streamers first!")
                    embed.setDescription("do " + prefix + "addshelp for more help")
                    embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                    msg.channel.send(embed)
                    return;
                }
                //add all youtubers and their urls to embeded message
                for(x = 0; x < youtubersurl.length; x++){
                    embed.addFields(
                        {name:youtubers[x], value:youtubersurl[x]}
                    )
                }
                embed.setColor('#FF0000')
                embed.setTitle("The currently added streamers are")
                embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                msg.channel.send(embed);
            break;
            case 'delyoutuber':
                try{
                    //check if streamer exsist
                    if(youtubers.indexOf(args[1].toLowerCase()) != -1){
                        //remove streamer from list
                        youtubersurl.splice(youtubers.indexOf(args[1].toLowerCase()),1)
                        youtubers.splice(youtubers.indexOf(args[1].toLowerCase()),1)
                        //make new files content
                        content = '';
                        for(x=0;x<youtubers.length;x++){
                            content += youtubers[x] + "," + youtubersurl[x] + ", "
                        }
                        //write file with new content and log that someone was deleted from data base
                        fs.writeFile("youtubers.txt", content, function(err,data){
                            if (err) throw(err)
                            console.log("deleted " + args[1].toLowerCase() + " from database")
                        })
                        //send embeded message
                        embed.setColor('#FF0000')
                        embed.setTitle("Youtuber successfully removed!")
                        embed.setDescription("do " + prefix + "youtubers for a list of youtubers")
                        embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                        msg.channel.send(embed)
                    }else{
                        //warm caller that streamer dose not exsist
                        embed.setColor('#FF0000')
                        embed.setTitle("Youtuber does not exsist!")
                        embed.setDescription("do " + prefix + "youtubers for a list of youtubers")
                        embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                        embed.setFooter("do " + prefix + "addhelp for help with this command")
                        msg.channel.send(embed)
                    }
                }
                catch(TypeError){
                    embed.setColor('#FF0000')
                    embed.setTitle("Please specify which youtuber you'd like to delete")
                    embed.setDescription("do " + prefix + "youtubers for a list of youtubers")
                    embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                    embed.setFooter("do " + prefix + "addhelp for help with this command")
                    msg.channel.send(embed)
                }
            break;
            case 'delstreamer':
                try{
                    //check if streamer exsist
                    if(streamersname.indexOf(args[1].toLowerCase()) != -1){
                        //remove streamer from list
                        streamersurl.splice(streamersname.indexOf(args[1].toLowerCase()),1)
                        streamersname.splice(streamersname.indexOf(args[1].toLowerCase()),1)
                        //make new files content
                        content = '';
                        for(x=0;x<streamersname.length;x++){
                            content += streamersname[x] + "," + streamersurl[x] + ", "
                        }
                        //write file with new content and log that someone was deleted from data base
                        fs.writeFile("streamers.txt", content, function(err,data){
                            if (err) throw(err)
                            console.log("deleted " + args[1].toLowerCase() + " from database")
                        })
                        //send embeded message
                        embed.setColor('#8e44ad')
                        embed.setTitle("Streamer successfully removed!")
                        embed.setDescription("do " + prefix + "streamers for a list of streamers")
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        msg.channel.send(embed)
                    }else{
                        //warm caller that streamer dose not exsist
                        embed.setColor('#8e44ad')
                        embed.setTitle("Streamer does not exsist!")
                        embed.setDescription("do " + prefix + "streamers for a list of streamers")
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        embed.setFooter("do " + prefix + "addhelp for help with this command")
                        msg.channel.send(embed)
                    }
                }
                catch(TypeError){
                    embed.setColor('#8e44ad')
                    embed.setTitle("Please specify which streamer you'd like to delete")
                    embed.setDescription("do " + prefix + "streamers for a list of streamers")
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    embed.setFooter("do " + prefix + "addhelp for help with this command")
                    msg.channel.send(embed)
                }
            break;
            case 'help':
                embed.setColor('#8e44ad')
                embed.setTitle("Commands")
                embed.addFields(
                    {name:prefix + "add", value:"This command goes into alot more depth do " + prefix + "addhelp to get more info"},
                    {name:prefix + "prefix + [anything]", value:"this command will set the server prefix to what you say (the prefix can not be longer than 2 letter"},
                    {name:prefix + "bug", value:"This will give you the link to the form where you can report bugs/request features"},
                    {name:prefix + "source", value:"This will give you the link to the source code (the code will not always be up to date)"},
                    {name:prefix + "request", value:"This will pring you to the feature request form"}
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
            case 'request':
                embed.setColor('#8e44ad')
                embed.setTitle("Feature request form")
                embed.setDescription("The form for requesting features in the the title")
                embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                embed.setURL("https://forms.gle/paz3kZsuBRViWnq28")
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
    if(msg.content.startsWith(';') && args[0] == 'elp' || args[0] == 'help'){
        var embed = new Discord.MessageEmbed()
        embed.setColor('#8e44ad')
        embed.setTitle("Commands")
        embed.addFields(
            {name:prefix + "add", value:"This command goes into alot more depth do " + prefix + "addhelp to get more info"},
            {name:prefix + "prefix + [anything]", value:"this command will set the server prefix to what you say (the prefix can not be longer than 2 letter"},
            {name:prefix + "bug", value:"This will give you the link to the form where you can report bugs/request features"},
            {name:prefix + "source", value:"This will give you the link to the source code (the code will not always be up to date)"},
            {name:prefix + "request", value:"This will pring you to the feature request form"}
        )
        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
        embed.setFooter("the server prefix is '" + prefix + "'")
        msg.channel.send(embed);           
    }
})

client.login(token);
