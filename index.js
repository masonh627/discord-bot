const Discord = require('discord.js');
const client = new Discord.Client();
const {Client, Attachment, MessageEmbed} = require('discord.js');
const fs = require("fs");
const { url } = require('inspector');

const token = 'YOUR TOKEN';


const ver = '2.5.5!'

var prefix = ';';

holder = [];
names = [];
urls = [];

client.on('ready', () => {
    console.log('This bot is online!')
    client.user.setActivity(";help")
    guildnums = client.guilds.cache.size
    fs.appendFile('Youtubers&Streamers', '', function(err, data){

    })
})

client.on('message', msg=>{

    let args = msg.content.substring(prefix.length).split(" ");

    if(msg.content.startsWith(prefix)){
        var embed = new Discord.MessageEmbed()
        switch(args[0].toLowerCase()){
            case 'add':
                //check if urls are correct
                if(args[1].toLowerCase().includes('https://www.twitch.tv/') || args[1].toLowerCase().includes('https://www.youtube.com/channel/') || args[1].toLowerCase().includes('https://www.youtube.com/user/') ){
                    names = [];
                    urls = [];
                    //see if its a twitch link or youtube link
                    if(args[1].toLowerCase().includes('https://www.twitch.tv/')){
                        //break down the link to the stuff we need
                        stuff = args[1].split('/')
                        //add streamer to database
                        fs.readFile('Youtubers&Streamers/' + msg.guild.name.toLowerCase().replace(/ /g, '') + 'streamers.txt', 'utf8', function(err,data){
                            if(err){
                                //if theres no server file add file and write data to it
                                fs.appendFile('Youtubers&Streamers/' + msg.guild.name.toLowerCase().replace(/ /g, '') + 'streamers.txt', stuff[stuff.indexOf('www.twitch.tv') + 1]) + ',' + args[1].toLowerCase() + ',', function(err,data){
                                    console.log(msg.guild.name.toLowerCase().replace(/ /g, '') + 'streamers.txt not found added to database')
                                    embed.setTitle("Streamer successfully addded!")
                                    embed.setDescription("do " + prefix + "streamers for a list of all streamers")
                                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                                    embed.setColor('#8e44ad')
                                    msg.channel.send(embed)  
                                    console.log(stuff[stuff.indexOf('www.twitch.tv') + 1] + ' added to database of ' + msg.guild.name.toLowerCase().replace(/ /g, ''))
                                }
                                return;
                            }
                            //sort files data
                            holder = data.split(',')
                            for(x=0;x<holder.length-1;x+=2){
                                names.push(String(holder[x]).replace(/ /g, ''))
                                urls.push(String(holder[x+1]).replace(/ /g, ''))
                            }
                            //check if streamer already added or not
                            if(urls.indexOf(args[1].toLowerCase()) !== -1){
                                embed.setTitle("Streamer already addded!")
                                embed.setDescription("do " + prefix + "streamers for a list of all streamers")
                                embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                                embed.setColor('#8e44ad')
                                msg.channel.send(embed)  
                                return;
                            }
                            //add streamer if not already added
                            fs.appendFile('Youtubers&Streamers/' + msg.guild.name.toLowerCase().replace(/ /g, '') + 'streamers.txt', stuff[stuff.indexOf('www.twitch.tv') + 1] + ',' + args[1].toLowerCase() + ',', function(err,data){
                                if(err) throw(err);
                                embed.setTitle("Streamer successfully addded!")
                                embed.setDescription("do " + prefix + "streamers for a list of all streamers")
                                embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                                embed.setColor('#8e44ad')
                                msg.channel.send(embed)  
                                console.log(stuff[stuff.indexOf('www.twitch.tv') + 1] + ' added to database of ' + msg.guild.name.toLowerCase().replace(/ /g, ''))
                                return;
                            })
                        })
                    }else{
                        //see if youtuber was givin a name
                        if(typeof(args[2]) !== 'undefined'){
                            //add youtuber to database
                            fs.readFile('Youtubers&Streamers/' + msg.guild.name.toLowerCase().replace(/ /g, '') + 'youtubers.txt', 'utf8', function(err,data){
                                if(err){
                                    //if theres no server file add file and write data to it
                                    fs.appendFile('Youtubers&Streamers/' + msg.guild.name.toLowerCase().replace(/ /g, '') + 'youtubers.txt', args[2].toLowerCase() + ',' + args[1].toLowerCase() + ',', function(err,data){
                                        console.log(msg.guild.name.toLowerCase().replace(/ /g, '') + 'youtubers.txt not found added to database')
                                        embed.setTitle("Youtuber successfully addded!")
                                        embed.setDescription("do " + prefix + "youtubers for a list of all youtubers")
                                        embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                                        embed.setColor('#FF0000')
                                        msg.channel.send(embed)  
                                        console.log(args[2].toLowerCase() + ' added to database of ' + msg.guild.name.toLowerCase().replace(/ /g, ''))
                                    })
                                    return;
                                }
                                //sort files data
                                holder = data.split(',')
                                for(x=0;x<holder.length-1;x+=2){
                                    names.push(String(holder[x]).replace(/ /g, ''))
                                    urls.push(String(holder[x+1]).replace(/ /g, ''))
                                }
                                //check if youtubers already added or not
                                if(urls.indexOf(args[1].toLowerCase()) !== -1){
                                    embed.setTitle("Youtuber already addded!")
                                    embed.setDescription("do " + prefix + "youtubers for a list of all youtubers")
                                    embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                                    embed.setColor('#FF0000')
                                    msg.channel.send(embed)  
                                    return;
                                }
                                //add youtuber if not already added
                                fs.appendFile('Youtubers&Streamers/' + msg.guild.name.toLowerCase().replace(/ /g, '') + 'youtubers.txt', args[2].toLowerCase() + ',' + args[1].toLowerCase() + ',', function(err,data){
                                    if(err) throw(err);
                                    embed.setTitle("Youtuber successfully addded!")
                                    embed.setDescription("do " + prefix + "youtubers for a list of all youtubers")
                                    embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                                    embed.setColor('#FF0000')
                                    msg.channel.send(embed)  
                                    console.log(args[2].toLowerCase() + ' added to database of ' + msg.guild.name.toLowerCase().replace(/ /g, ''))
                                    return;
                                })
                            })
                        }else{
                            //tell user that youtuber wasn't givin a name
                            embed.setTitle("Please give the youtuber a name!")
                            embed.setDescription("do " + prefix + "addhelp for more help with command")
                            embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                            embed.setColor('#FF0000')
                            msg.channel.send(embed)  
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
            break;
            case 'streamers':
                //define placeholder lists
                names = [];
                urls = [];
                //read servers file
                fs.readFile("Youtubers&Streamers/" + msg.guild.name.toLowerCase().replace(/ /g, '') + "streamers.txt", 'utf8', function(err, data){
                    if(err){
                        //error handling
                        embed.setColor('#8e44ad')
                        embed.setTitle("Please add some streamers first!")
                        embed.setDescription("do " + prefix + "addhelp for more help")
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        msg.channel.send(embed)
                        return;
                    };
                    //defining embeds feilds
                    holder = data.split(',')
                    for(x=0;x<holder.length-1;x+=2){
                        names.push(String(holder[x]).replace(/ /g, ''))
                        urls.push(String(holder[x+1]).replace(/ /g, ''))
                    }
                    for(x=0;x<names.length;x++){
                        embed.addFields(
                            {name:names[x], value:urls[x]}
                        )
                    }
                    //sending embed
                    embed.setColor('#8e44ad')
                    embed.setTitle("The currently added youtubers are")
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed);
                })
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
                    {name:"How to use " + prefix + "streamers", value:prefix + "streamers should return a list of all added streamers"},
                    {name:"How to use " + prefix + "delstreamer", value:prefix + "delstreamer <streamer name> if you do this command you should be able to delete the streamer from your list"},
                    {name:"How to use " + prefix + "rtreamer", value:prefix + "renamestreamer <current streamer name> <new streamer name> should rename the streamer in the list"},
                    {name:"How to use " + prefix + "youtubers", value:prefix + "youtubers should return a list of all added youtubers"},
                    {name:"How to use " + prefix + "delyoutuber", value:prefix + "delyoutuber <youtuber name> if you do this command you should be able to delete the youtuber from your list"},
                    {name:"How to use " + prefix + "ryoutuber", value:prefix + "renameyoutuber <current youtuber name> <new youtuber name> should rename the youtuber in the list"},
                )
                embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                msg.reply(embed);
            break;
            case 'rstreamer':
                //check if command was called right
                if(typeof(args[1]) == 'undefined' || typeof(args[2]) == 'undefined'){
                    //tell user that command was called wrong
                    embed.setColor('#8e44ad')
                    embed.setTitle("Error")
                    embed.setDescription("do " + prefix + "addhelp for help with this command")
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                    return;
                }
                //place holder lists
                names = [];
                urls = [];
                //read data from file
                fs.readFile("Youtubers&Streamers/" + msg.guild.name.toLowerCase().replace(/ /g, '') + "streamers.txt", 'utf8', function(err, data){
                    if(err){                        
                        //error handler
                        embed.setColor('#8e44ad')
                        embed.setTitle("No streamers added")
                        embed.setDescription("do " + prefix + "addhelp for help with this command")
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        msg.channel.send(embed)
                        return;
                    };
                    holder = data.split(",")
                    for(x=0;x<holder.length-1;x+=2){
                        names.push(String(holder[x]).replace(/ /g, ''))
                        urls.push(String(holder[x+1]).replace(/ /g, ''))
                    }
                    //check if streamer exsist in the file
                    if(names.indexOf(args[1].toLowerCase()) == -1){
                        embed.setColor('#8e44ad')
                        embed.setTitle("Error")
                        embed.setDescription("Streamer is not in database! try adding them to it!")
                        embed.setFooter("do " + prefix + "addhelp for help with this command")
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        msg.channel.send(embed)
                        console.log(names.indexOf(args[1].toLowerCase()))
                        console.log(names)
                        return;
                    }
                    names[names.indexOf(args[1].toLowerCase())] = args[2].toLowerCase()
                    //make new content for file
                    content = ''
                    for(x=0;x<names.length-1;x++){
                        content += names[x] + ',' + urls[x] + ', '
                    }
                    //write new content to file
                    fs.writeFile("Youtubers&Streamers/" + msg.guild.name.toLowerCase().replace(/ /g, '') + "streamers.txt", content, function(err, data){
                        if(err) throw(err);
                        console.log("renamed " + args[1].toLowerCase() + " to " + args[2].toLowerCase() + " in the " + msg.guild.name.toLowerCase().replace(/ /g, '') + " database")
                        embed.setColor('#8e44ad')
                        embed.setTitle("Streamer successfully renamed!")
                        embed.setDescription("do " + prefix + "streamers for a list of all streamers")
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        msg.channel.send(embed)
                    })
                })
            break;
            case 'ryoutuber':
                //check if command was called right
                if(typeof(args[1]) == 'undefined' || typeof(args[2]) == 'undefined'){
                    //tell user that command was called wrong
                    embed.setColor('#FF0000')
                    embed.setTitle("Error")
                    embed.setDescription("do " + prefix + "addhelp for help with this command")
                    embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                    msg.channel.send(embed)
                    return;
                }
                //place holder lists
                names = [];
                urls = [];
                //read data from file
                fs.readFile("Youtubers&Streamers/" + msg.guild.name.toLowerCase().replace(/ /g, '') + "youtubers.txt", 'utf8', function(err, data){
                    if(err){
                        //error handler
                        embed.setColor('#FF0000')
                        embed.setTitle("No youtubers added")
                        embed.setDescription("do " + prefix + "addhelp for help with this command")
                        embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                        msg.channel.send(embed)
                        return;
                    };
                    holder = data.split(",")
                    for(x=0;x<holder.length;x+=2){
                        names.push(String(holder[x]).replace(/ /g, ''))
                        urls.push(String(holder[x+1]).replace(/ /g, ''))
                    }
                    //check if streamer exsist in the file
                    if(names.indexOf(args[1].toLowerCase()) == -1){
                        embed.setColor('#FF0000')
                        embed.setTitle("Error")
                        embed.setDescription("Youtuber is not in database! try adding them to it!")
                        embed.setFooter("do " + prefix + "addhelp for help with this command")
                        embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                        msg.channel.send(embed)
                        return;
                    }
                    names[names.indexOf(args[1].toLowerCase())] = args[2].toLowerCase()
                    //make new content for file
                    content = ''
                    for(x=0;x<names.length-1;x++){
                        content += names[x] + ',' + urls[x] + ', '
                    }
                    //write new content to file
                    fs.writeFile("Youtubers&Streamers/" + msg.guild.name.toLowerCase().replace(/ /g, '') + "youtubers.txt", content, function(err, data){
                        if(err) throw(err);
                        console.log("renamed " + args[1].toLowerCase() + " to " + args[2].toLowerCase() + " in the " + msg.guild.name.toLowerCase().replace(/ /g, '') + " database")
                        embed.setColor('#FF0000')
                        embed.setTitle("Youtuber successfully renamed!")
                        embed.setDescription("do " + prefix + "youtubers for a list of all youtubers")
                        embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                        msg.channel.send(embed)
                    })
                })
            break;
            case 'youtubers':
                //define placeholder lists
                names = [];
                urls = [];
                //read servers file
                fs.readFile("Youtubers&Streamers/" + msg.guild.name.toLowerCase().replace(/ /g, '') + "youtubers.txt", 'utf8', function(err, data){
                    if(err){
                        //error handling
                        embed.setColor('#FF0000')
                        embed.setTitle("Please add some youtubers first!")
                        embed.setDescription("do " + prefix + "addshelp for more help")
                        embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                        msg.channel.send(embed)
                        return;
                    };
                    //defining embeds feilds
                    holder = data.split(',')
                    for(x=0;x<holder.length-1;x+=2){
                        names.push(holder[x])
                        urls.push(holder[x+1])
                    }
                    for(x=0;x<names.length;x++){
                        embed.addFields(
                            {name:names[x], value:urls[x]}
                        )
                    }
                    //sending embed
                    embed.setColor('#FF0000')
                    embed.setTitle("The currently added youtubers are")
                    embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                    msg.channel.send(embed);
                })
            break;
            case 'delyoutuber':
                //check if command was called right
                if(typeof(args[1]) == 'undefined'){
                    //tell user that command was called wrong
                    embed.setColor('#FF0000')
                    embed.setTitle("Error")
                    embed.setDescription("do " + prefix + "addhelp for help with this command")
                    embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                    msg.channel.send(embed)
                    return;
                }
                //place holder lists
                names = [];
                urls = [];
                //read data from file
                fs.readFile("Youtubers&Streamers/" + msg.guild.name.toLowerCase().replace(/ /g, '') + "youtubers.txt", 'utf8', function(err, data){
                    if(err){
                        //error handler
                        embed.setColor('#FF0000')
                        embed.setTitle("No youtubers added")
                        embed.setDescription("do " + prefix + "addhelp for help with this command")
                        embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                        msg.channel.send(embed)
                        return;
                    };
                    holder = data.split(",")
                    for(x=0;x<holder.length;x+=2){
                        names.push(String(holder[x]).replace(/ /g, ''))
                        urls.push(String(holder[x+1]).replace(/ /g, ''))
                    }
                    //check if streamer exsist in the file
                    if(names.indexOf(args[1].toLowerCase()) == -1){
                        embed.setColor('#FF0000')
                        embed.setTitle("Error")
                        embed.setDescription("Youtuber is not in database! try adding them to it!")
                        embed.setFooter("do " + prefix + "addhelp for help with this command")
                        embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                        msg.channel.send(embed)
                        return;
                    }
                    names.splice(names.indexOf(args[1].toLowerCase()), 1)
                    //make new content for file
                    content = ''
                    for(x=0;x<names.length-1;x++){
                        content += names[x] + ',' + urls[x] + ', '
                    }
                    //write new content to file
                    fs.writeFile("Youtubers&Streamers/" + msg.guild.name.toLowerCase().replace(/ /g, '') + "youtubers.txt", content, function(err, data){
                        if(err) throw(err);
                        console.log("deleted " + args[1].toLowerCase() + " in the " + msg.guild.name.toLowerCase().replace(/ /g, '') + " database")
                        embed.setColor('#FF0000')
                        embed.setTitle("Youtuber successfully deleted!")
                        embed.setDescription("do " + prefix + "youtubers for a list of all youtubers")
                        embed.setThumbnail("https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-678x381.jpg.webp")
                        msg.channel.send(embed)
                    })
                })
            break;
            case 'delstreamer':
                //check if command was called right
                if(typeof(args[1]) == 'undefined'){
                    //tell user that command was called wrong
                    embed.setColor('#8e44ad')
                    embed.setTitle("Error")
                    embed.setDescription("do " + prefix + "addhelp for help with this command")
                    embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                    msg.channel.send(embed)
                    return;
                }
                //place holder lists
                names = [];
                urls = [];
                //read data from file
                fs.readFile("Youtubers&Streamers/" + msg.guild.name.toLowerCase().replace(/ /g, '') + "streamers.txt", 'utf8', function(err, data){
                    if(err){                        
                        //error handler
                        embed.setColor('#8e44ad')
                        embed.setTitle("No streamers added")
                        embed.setDescription("do " + prefix + "addhelp for help with this command")
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        msg.channel.send(embed)
                        return;
                    };
                    holder = data.split(",")
                    for(x=0;x<holder.length;x+=2){
                        names.push(String(holder[x]).replace(/ /g, ''))
                        urls.push(String(holder[x+1]).replace(/ /g, ''))
                    }
                    //check if streamer exsist in the file
                    if(names.indexOf(args[1].toLowerCase()) == -1){
                        embed.setColor('#8e44ad')
                        embed.setTitle("Error")
                        embed.setDescription("Streamer is not in database! try adding them to it!")
                        embed.setFooter("do " + prefix + "addhelp for help with this command")
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        msg.channel.send(embed)
                        console.log(names.indexOf(args[1].toLowerCase()))
                        console.log(names)
                        return;
                    }
                    urls.splice(names.indexOf(args[1].toLowerCase()), 1)
                    names.splice(names.indexOf(args[1].toLowerCase()), 1)

                    //make new content for file
                    content = ''
                    for(x=0;x<names.length-1;x++){
                        content += names[x] + ',' + urls[x] + ', '
                    }
                    //write new content to file
                    fs.writeFile("Youtubers&Streamers/" + msg.guild.name.toLowerCase().replace(/ /g, '') + "streamers.txt", content, function(err, data){
                        if(err) throw(err);
                        console.log("deleted " + args[1].toLowerCase() + " in the " + msg.guild.name.toLowerCase().replace(/ /g, '') + " database")
                        embed.setColor('#8e44ad')
                        embed.setTitle("Streamer successfully deleted!")
                        embed.setDescription("do " + prefix + "streamers for a list of all streamers")
                        embed.setThumbnail("https://blog.twitch.tv/assets/uploads/generic-email-header-1.jpg")
                        msg.channel.send(embed)
                    })
                })
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
