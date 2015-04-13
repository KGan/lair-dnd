LairDnD.Views.ListingCard = Backbone.View.extend({
  template: JST['search/card'],
  className: 'listing-card col-md-6',

  render: function() {
    var content = this.template({ listing: this.model });
    this.$el.html(content);
    return this;
  }
});
