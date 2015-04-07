LairDnD.Collections.Listings = Backbone.collections.extend(
  _.extend({}, LairDnd.Mixins.SORT, {
    url: '/api/listings',
    initialize: function(options) {
      if(options) {
        this._sort_by = options.sort_by;
      }
    }
  })
);
