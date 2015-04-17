LairDnD.Views.BrowseIndex = Backbone.CompositeView.extend(
  _.extend({}, {
    template: JST['browse/index'],
    events: {},
    initialize: function(options) {
      
    },
    render: function() {
      var content = this.template();
      this.$el.html(content);
      this.collection.each(function(model){
        var subview = new LairDnD.Views.FLCard({
          model: model
        });
        this.addSubview('#featured-list');
      });
      return this;
    }
  })
);
