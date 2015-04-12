LairDnD.Routers.LandingRouter = LairDnD.Routers.BaseRouter.extend({
  routes: {
    '': 'landing',
    'new-listing': 'newListing',
  },
  landing: function() {
    var landingView = new LairDnD.Views.Landing({
      navView: this.views.navbar
    });
    this._swapView('$rootEl', landingView);
  },

});
