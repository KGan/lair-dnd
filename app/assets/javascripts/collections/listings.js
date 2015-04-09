LairDnD.Collections.Listings = Backbone.Collection.extend(
  _.extend({}, LairDnD.Mixins.SORT, {
    url: '/api/listings',
    model: LairDnD.Models.Listing,
    initialize: function(options) {
      if(options) {
        this._sort_by = options.sort_by;
      }
    },
    getOrFetch: function(id) {
      var md = this.get(id);
      if(!md) {
        md = new this.model({id: id});
      }
      var coll = this;
      md.fetch({
        success: function(model) {
          coll.add(model, {merge:true});
        }
      });
      return md
    }
  })
);
