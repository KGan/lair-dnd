window.LairDnD = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},
  initialize: function() {
    new LairDnD.Routers.Router({
      $rootEl: $('#bb-content'),
      $navBar: $('#navbar'),
      $flashes: $('#flashes')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  LairDnD.initialize();
});
