LairDnD.Routers.ShowRouter = LairDnD.Routers.BaseRouter.extend({
  routes: {
    '': 'showListing',
    'new-listing': 'newListing',
  },
  after_init: function(options) {
    this.model = this.collections.listings.getOrFetch(options.listing_id);
  },
  showListing: function() {
    var listingView = new LairDnD.Views.ListingShow({
      model: this.model,
      $el: $('#listing-show')
    });
    listingView.render();
  },

});


LairDnD.Routers.ListingRouter = LairDnD.Routers.BaseRouter.extend({
  routes: {
    '' : 'searchListings',
    'new-listing': 'newListing',
  },

  after_init: function(options) {
    this.query_params = options.query_params;
  },

  searchListings: function() {
    this.views.mainView = new LairDnD.Views.SearchMain({
      collection: this.collections.listings,
      query_params: this.query_params
    });
    this._swapView('$rootEl', this.views.mainView);
  }
});
