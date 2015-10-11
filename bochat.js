let Chats = new Mongo.Collection('chats');

function makeid() {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for( var i = 0; i < 5; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

if (Meteor.isClient) {

  let id = Session.get('id');

  if (!id) {
    id = makeid();
    Session.set('id', id);
  }

  Template.chat.helpers({
    chats() {
      return Chats.find({});
    }
  });

  Template.chat.events({
    'submit form': function (event, template) {
      let chat = event.target.chatvalue.value;
      event.target.chatvalue.value = '';
      console.log(chat)
      Chats.insert({chat: `${id}: ${chat}`});
      event.preventDefault();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Chats.remove({});
    Chats.insert({chat: 'Hello. CHAT NOW!'});
  });
}
