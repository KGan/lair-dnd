LairDnD.Views.BrowseIndex = Backbone.CompositeView.extend(
  _.extend({}, {
    template: JST['browse/featureds'],
    events: {},
    initialize: function(options) {
      this.listenTo(this.collection, 'sync add remove', this.render);
    },
    render: function() {
      var content = this.template();
      this.$el.html(content);
      this.collection.each(function(model){
        var subview = new LairDnD.Views.FLCard({
          model: model
        });
        this.addSubview('#featured-list', subview);
      }.bind(this));
      return this;
    }
  })
);
