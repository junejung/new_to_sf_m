MenuList = new Meteor.Collection('nemu-list');

if (Meteor.isClient) {

  Meteor.Router.add({
    '/' : 'list_posts',
    '/create' : 'new_post',
  });

  Template.top_bar.menu = function(){
    return MenuList.find()
  }

  Template.new_post.events({
    'submit form.new_post': function(e, template) {
      e.preventDefault();
      ArticleList.insert({
        author: Meteor.user().emails[0].address,
        title: template.find('input[class = title]').value,
        url: template.find('input[class = url]').value,
        created_at: new Date()
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(MenuList.find().count() === 0){
      var menus = [
        {name: 'Home', url: '/'},
        {name: 'Submit', url: '/create'},
        {name: 'Ask', url: '#'}
      ];
      for (var i = 0; i < menus.length; i++) {
        MenuList.insert(menus[i]);
      }
    }
  });
}
