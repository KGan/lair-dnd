LairDnD.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'landing',
    'listing/new': 'newListing',
    'listing/:id': 'showListing',
  },
  initialize: function(options) {
    this.contents = options;
    this.views = {};
    this.collections = {
      listings: new LairDnD.Collections.Listings()
    };
    this._initViews();
  },

  landing: function() {
    var landingView = new LairDnD.Views.Landing();
    this._swapView('$rootEl', landingView);
  },

  showListing: function(id) {
    var model = this.collections.listings.getOrFetch(id);
    var listingView = window.lv = new LairDnD.Views.ListingShow({
      model: model,
    });
    this._swapView('$rootEl', listingView);
  },

  newListing: function() {
    var nlView = new LairDnD.Views.NewForm({
      model: new LairDnD.Models.Listing(),
      className: 'new-listing'
    });

    this._swapView('$rootEl', nlView);
  },

  _initViews: function(){
    //navbar and main(body) are fixed and nonchanging.
    this.views.navbar = new LairDnD.Views.Navbar({
      $navbar: this.contents.$navbar
    });

    this.views.main = new LairDnD.Views.MainView();
  },

  _swapView: function(select, view) {
    if (this.views[select]) {
      this.views[select].remove();
    }
    this.views[select] = view;
    this.contents[select].html(view.render().$el);
  }
});
