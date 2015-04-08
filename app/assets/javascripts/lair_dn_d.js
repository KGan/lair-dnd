window.LairDnD = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},
  initialize: function() {
    new LairDnD.Routers.Router({
      $rootEl: $('#bb-content'),
      $navbar: $('#navbar'),
      $flashes: $('#flashes')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  LairDnD.initialize();

  filepicker.setKey("Am4pdKMVZS3i6kwFiJnYgz");
});
