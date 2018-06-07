const SlackBot = require('slackbots');
const fs = require('fs')
 
// create a bot
var bot = new SlackBot({
    token: 'xoxb-377244924643-378430735207-SLI43KbHTlQSBspcV6BTJkdz', // Add a bot https://my.slack.com/services/new/bot and put the token 
    name: 'Volt'
});
 
bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':dog:'
    };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
    bot.postMessageToChannel('général', 'meow!', params);


    
    
});

/**
 * @param {object} data 
 */
bot.on('message', function(event) {
    // all ingoing events https://api.slack.com/rtm
    console.log(event);
    // fs.readFile('log.json', function (err, data) {
    //     var json = JSON.parse(data)
    //     json.push(event)
    
    //     fs.writeFile("log.json", JSON.stringify(json))
    // })


    switch(event.type) {
        case 'hello': 

            break;

        case 'team_join':



            break;

        default:
    }



});