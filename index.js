const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'YOUR TOKEN HERE';

var prefix = ';'; //change this if you want a custom prefix

String; streamers = new Array("");

client.on('ready', () => {
    console.log('This bot is online!')
})

client.on('message', msg=>{

    let args = msg.content.substring(prefix.length).split(" ");

    if(msg.content.startsWith(prefix)){
        switch(args[0]){
            case 'help':
                msg.channel.send("The Prefix is " + prefix + " and you're my favorite ;D");
            break;
            case 'twitch':
                if(args.length == 2){
                    switch(args[1]){
                        case args[1] = 'ozark':
                            msg.reply("https://www.twitch.tv/ozark_r6");
                        break;
                        case args[1] = 'snips':
                            msg.reply("https://www.twitch.tv/snips_r6");
                        break;
                        case args[1] = 'pags':
                            msg.reply("https://twitch.tv/pagsidw");
                        break;
                        case args[1] = 'chakra':
                            msg.reply("https://twitch.tv/1chakra1 ");
                        break;
                        case args[1] = 'godzy':
                            msg.reply("https://www.twitch.tv/godzyfps");
                        break;
                        case args[1] = 'ay':
                            msg.reply("https://www.twitch.tv/aypsychopomp")
                        break;
                    }
                }else{
                    msg.reply('You need to enter a channel name! \n' + 'ozark \n' + 'snips \n' + 'pags \n' + 'chakra \n' + 'godzy \n');
                }
            break;
            case 'prefix':
                if(args.length == 2){
                    prefix = args[1];
                    msg.channel.send('The Prefix was set to ' + prefix);
                }
            break;
            case 'cmds':
                msg.channel.send("Current added commands \n" + prefix + "help \n" + "  This conmmand helps with basic stuff \n\n" + prefix + "twitch \n" + "  THIS COMMAND IS BEING WORKED ONE RN This command returns the link to the Twitch page of the person you put in \n\n" + prefix + "prefix + [anything] \n" + "  This command will change the prefix on the server");
            break;
        }
    }
})

client.login(token);
