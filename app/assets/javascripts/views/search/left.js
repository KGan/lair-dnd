LairDnD.Views.LeftPane = Backbone.CompositeView.extend({
  template: JST['search/leftpane'],
  events: {
    'scroll-panel': 'scrollToPanel'
  },

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
  
  scrollToPanel: function(e, marker, lid) {
    var $elem = this.viewCollection()[lid].$el;
    $elem.addClass('selected');
    var $container = this.$('.search-results');
    $container.scrollTop($container.scrollTop() + $elem.position().top);
  },

  unselectPanel: function(e, marker, lid) {
    var $elem = this.viewCollection()[lid].$el;
    if ($elem) $elem.removeClass('selected');
  },

  viewCollection: function() {
    if (this._viewCollection === undefined) {
      this._viewCollection = {};
    }
    return this._viewCollection;
  },

  loaded: function(collection) {
    this.$('.search-results').empty();
    collection.each(function(listing) {
      var v = new LairDnD.Views.ListingCard({ model: listing });
      this.viewCollection()[listing.id] = v;
      this.addSubview('.search-results', v);
    }.bind(this));
  }
});
