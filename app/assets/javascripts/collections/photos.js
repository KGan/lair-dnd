LairDnD.Collections.Photos = Backbone.Collection.extend({
  url: '/api/photos',
  model: LairDnD.Models.Photo,
  initialize: function(models, options) {
    this.listing = options.listing;
    this.listenTo(this.listing, 'sync', this.updateAll);
  },

  updateAll: function() {
    _(this.models).each(function(model){
      model.trySave({listing_id: this.listing.id});
    }.bind(this));
  }
});
