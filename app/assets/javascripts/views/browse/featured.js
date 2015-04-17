LairDnD.Views.FLCard = Backbone.View.extend({
  template:JST['browse/card'],
  events: {
    'click' : 'searchFeaturedLocation'
  },
  tagName: 'li',
  className: 'col-md-6 col-sm-12 featured-location',
  initialize: function(options) {
  },
  render: function() {
    var content = this.template({
      location: this.model
    });
    this.$el.html(content);
    return this;
  },
  searchFeaturedLocation: function() {
    $('form.landsearch').trigger('featured-search', [this.model]);
    
  }

});
