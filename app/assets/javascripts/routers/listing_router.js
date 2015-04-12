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
    this._swapView('$rootEl', listingView);
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
    this.views.google_map;
  }
});
