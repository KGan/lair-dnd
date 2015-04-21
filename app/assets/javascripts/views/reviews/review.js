LairDnD.Views.Review = Backbone.View.extend({
  template: JST['reviews/review'],
  className: 'media review',
  render: function() {
    var content = this.template({ review: this.model });
    this.$el.html(content);
    return this;
  }
});
