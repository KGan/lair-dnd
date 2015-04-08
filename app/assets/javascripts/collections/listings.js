LairDnD.Collections.Listings = Backbone.Collection.extend(
  _.extend({}, LairDnD.Mixins.SORT, {
    url: '/api/listings',
    model: LairDnD.Collections.Listing,
    initialize: function(options) {
      if(options) {
        this._sort_by = options.sort_by;
      }
    }
  })
);
