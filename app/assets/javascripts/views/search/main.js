LairDnD.Views.SearchMain = Backbone.CompositeView.extend({
  template: JST['search/main'],
  id: 'results-page',
  events: {
    'selected-panel': 'selectMarker'
  },
  selectMarker: function(e, id) {
    this.rightpane.$el.trigger('select-marker', [id]);
  },
  initialize: function(options) {
    this.searched_location = options.query_params.location;
    this.collection.fetch({
      data: { search: options.query_params }
    });
  },
  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.leftpane = new LairDnD.Views.LeftPane({
      $el: $('.leftpane'),
      collection: this.collection
    })
    this.addSubview('.leftpane', this.leftpane);


    this.rightpane = new LairDnD.Views.RightPane({
      $el: $('.rightpane'),
      collection: this.collection,
      init_location: this.searched_location
    });
    this.addSubview('.rightpane', this.rightpane);
    this.rightpane.initMap();

    return this;
  },
});
