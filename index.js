const Discord = require('discord.js');
const client = new Discord.Client();
const {Client, Attachment, MessageEmbed} = require('discord.js');

const token = 'YOUR TOKEN';

var prefix = ';';

streamersname = [];
streamersurl = [];

client.on('ready', () => {
    console.log('This bot is online!')
})

client.on('message', msg=>{

    let args = msg.content.substring(prefix.length).split(" ");
    
    if(msg.content.startsWith(prefix)){
        switch(args[0]){
            case 'adds':
                if(streamersurl.indexOf(args[2]) == -1 && args[1] != 'undefined' && args[2] != 'undefined'){
                    streamersname.add(args[1])
                    streamersurl.add(args[2])
                    msg.channel.send("streamer sucsessfully added!")
                }else{
                    msg.channel.send("An error has accoured do " + prefix + "addshelp if you need help using this command")
                }
            break;
            case 'streamers':
                if(streamersurl.length == 0){
                    msg.channel.send("Please add some streamers first!")
                    return;
                }
                message = 'The currently added streamers are\n\n';
                for(x = 0; x < streamersname.length; x++){
                    message += streamersname[x] + "\n"
                }
                msg.channel.send(message + "\nto get all the urls of the streamers do " + prefix + "streamersurl to get a dm with a list of them");
            break;
            case 'streamersurl':
                if(streamersurl.length == 0){
                    msg.channel.send("Please add some streamers first!")
                    return;
                }
                message = 'The curently added streamer urls are\n\n'
                for(x = 0; x <streamersurl.length; x++){
                    message += streamersurl[x] + "\n"
                }
                msg.author.send(message)
            case 'prefix':
                if(args.length == 2){
                    if(args[1].length > 2){
                        msg.channel.send("Prefix to long!")
                        return;
                    }
                    prefix = args[1];
                    msg.channel.send('The Prefix was set to ' + prefix);
                }else if(args.length == 1){
                    msg.channel.send("the prefix is" + prefix)
                }else{
                    msg.channel.send("unknown use of command prefix")
                }
            break;
            case 'cmds':
                msg.channel.send("Current added commands \n" + prefix + "adds\n" + "this command goes into a lot of depth for more help with it do " + prefix + "addshelp\n\n" + prefix + "prefix + [anything] \n" + "  This command will change the prefix on the server \n\n" + prefix + "RPS \n" + "  This command will return rather rock,paper or scissors");
            break;
            case 'help':
                msg.channel.send("Current added commands \n" + prefix + "adds\n" + "this command goes into a lot of depth for more help with it do " + prefix + "addshelp\n\n" + prefix + "prefix + [anything] \n" + "  This command will change the prefix on the server \n\n" + prefix + "RPS \n" + "  This command will return rather rock,paper or scissors");
            break;
            case 'rps':
                x = Math.random()
                if(x<= 0.33){
                    msg.reply("Rock");
                }if (x<= 0.66 && x>= 0.34){
                    msg.reply("Scissors")
                } else {
                    msg.reply("Papper")
                }
            break;
        }
    }
})

client.login(token);
