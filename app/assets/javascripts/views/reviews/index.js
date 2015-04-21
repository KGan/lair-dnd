LairDnD.Views.ReviewIndex = Backbone.CompositeView.extend({
  templates: {
    'index' : JST['reviews/list'],
  },
  id: 'reviews',
  initialize: function(options) {
    this.listenToOnce(this.collection, 'sync', this.renderReviews);
    this.listing_id = options.listing_id;
    this.addNewForm();
  },
  render: function() {
    var content = this.templates.index();
    this.$el.html(content);
    return this;
  },
  addNewForm: function() {
    var nfv = new LairDnD.Views.NewReview({
      model: new LairDnD.Models.Review(),
      listing_id: this.listing_id,
      collection: this.collection
    });
    this.addSubview('#new-review', nfv);
  },
  prepReview: function(model, collection, opts) {
    var subv = new LairDnD.Views.Review({model: model});
    this.addSubview('#past-reviews', subv, true);
  },
  renderReviews: function() {
    this.collection.each(function(model) {
      var subview = new LairDnD.Views.Review({
        model: model
      });
      this.addSubview('#past-reviews', subview);
    }.bind(this));
    this.listenTo(this.collection, 'add', this.prepReview);
  }

});
