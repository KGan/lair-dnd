LairDnD.Views.LeftPane = Backbone.CompositeView.extend({
  template: JST['search/leftpane'],

  initialize: function(options) {
    this.$el = options.$el;
    this.listenTo(this.collection, 'sync', this.loaded);
  },

  render: function() {
    var content = this.template({
      collection: this.collection
    });
    this.$el.html(content);
    return this;
  },

  loaded: function(collection) {
    this.$('.search-results').empty();
    collection.each(function(listing) {
      var v = new LairDnD.Views.ListingCard({ model: listing });
      this.addSubview('.search-results', v);
    }.bind(this));
  }
});
