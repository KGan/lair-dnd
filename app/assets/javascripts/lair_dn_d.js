window.LairDnD = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},
  initialize: function() {
    new LairDnD.Routers.LandingRouter({
      $rootEl: $('#bb-content'),
      $navbar: $('nav.navbar'),
      $flashes: $('#flashes')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  
  LairDnD.initialize();

  filepicker.setKey("Am4pdKMVZS3i6kwFiJnYgz");
});
