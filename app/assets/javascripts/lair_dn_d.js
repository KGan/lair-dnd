window.LairDnD = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new LairDnD.Routers.Router({$rootEl: $('#bb-content')});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  LairDnD.initialize();
});
