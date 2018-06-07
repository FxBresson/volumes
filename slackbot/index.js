const SlackBot = require('slackbots');
// const fs = require('fs');

const spaces = {
    makerspace: ['makerspace'],
    coworking: ['coworking'],
    foodlab: ['foodlab', 'food', 'lab'],
}

const subjects = {
    schedule: ['horaire', 'heure', 'ouverture', 'fermeture', 'ouvre', 'ferme'],
    // action: ['cuisiner', 'cuisine', 'travailler', 'travail', 'réviser', 'révision', 'réunion', 'créer', 'faire', 'produire' ],
    // demande: ['réserver', 'réservation', 'location', 'louer', 'privatisation', 'privatiser'],
    compost: ['compost', 'recyclage', 'recycler']
}

const answers = {
    foodlab: {
        schedule: 'Le FoodLab est ouvert tous les jours de 9h a 22h',
        compost: 'Il y a 2 poubelles, une pour le recyclable, une pour le non-recyclable'
    },
    coworking: {
        schedule: 'L\'espace coworking est ouvert tous les jours de 9h a 22h'
    },
    makerspace: {
        schedule: 'Le Maker Space est ouvert tous les jours de 9h a 22h'
    }
}

const admins = {
    foodlab : 'fx-bresson@live.fr',
    makerspace: 'fx-bresson@live.fr',
    coworking: 'lancelinmarine@gmail.com'
}
 
// create a bot
var bot = new SlackBot({
    token: 'xoxb-377244924643-378430735207-SLI43KbHTlQSBspcV6BTJkdz', // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'Volt'
});

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
    // bot.postMessageToChannel('général', 'meow!', params);

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    // bot.postMessageToChannel('général', 'woof!', params);




});

/**
 * @param {object} data
 */
bot.on('message', event => {
    // all ingoing events https://api.slack.com/rtm
    // console.log(event);
    // fs.readFile('log.json', function (err, data) {
    //     var json = JSON.parse(data)
    //     json.push(event)

    //     fs.writeFile("log.json", JSON.stringify(json))
    // })

    switch(event.type) {
        case 'hello':
            break;

        case 'team_join':

            // Welcom message for the new user
            var welcomeMessage = 'Hello '+ event.user.real_name + ' ! Bienvenue chez Volumes ! Vous pouvez me poser des questions simples sur le fonctionnement de Volumes ou saisir quelques mot-clés. Je suis à votre disposition !';

            // Open a new direct message
            bot.openIm(event.user.id).then(dm => {
                // Post the welcome message to the new user
                bot.postMessage(dm.channel.id, welcomeMessage).then(e => {
                    console.log('welcome message sent!');
                })
            });

            break;

        case 'message':
            bot.openIm(event.user).then(dmToUser => {
                if (event.channel == dmToUser.channel.id) {

                    let user = event.user

                    let space = null;
                    let subject = null;
                    let message = event.text.trim().toLowerCase().split(' ')

                    for (messageWord of message) {
                        for (targetSpace in spaces) {
                            if (spaces[targetSpace].indexOf(messageWord) > -1) {
                                if (space == null)
                                    space = targetSpace;
                            }
                        }
                        for (targetSubject in subjects) {
                            if (subjects[targetSubject].indexOf(messageWord) > -1) {
                                if (subject == null)
                                    subject = targetSubject
                            }
                        }
                    }

                    if (subject != null && answers[space][subject] != undefined) {
                        bot.postMessage(dmToUser.channel.id, answers[space][subject])
                    } else {
                        if (space != null) {
                            bot.getUserByEmail(admins[space]).then(admin => {
                                bot.openIm(admin.id).then(dmToAdmin => {
                                    console.log(dmToAdmin)
                                    bot.postMessage(dmToAdmin.channel.id, 'Un utilisateur a une question a propos de ' + space);
                                    bot.postMessage(dmToUser.channel.id, 'Un admin pour '+space+' a été contacté')
                                })
                            }).fail(err => {
                                console.log('ERROR : ', err)
                            })
                        } else {
                            bot.postMessage(dmToUser.channel.id, 'Je n\'ai pas compris votre question')
                        }
                    }
                }
            })
            break;

        default:
    }



});
