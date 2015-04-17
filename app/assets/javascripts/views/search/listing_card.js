LairDnD.Views.ListingCard = Backbone.View.extend({
  template: JST['search/card'],
  className: 'listing-card col-md-6',

  events: {
    'mouseover': 'pubhover',
  },
  render: function() {
    var content = this.template({ listing: this.model });
    this.$el.html(content);
    return this;
  },
  pubhover: function(e) {
    e.preventDefault();
   this.$el.trigger('selected-panel', [this.model.id]); 
  }
});
