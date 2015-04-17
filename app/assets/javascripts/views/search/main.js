LairDnD.Views.SearchMain = Backbone.CompositeView.extend({
  template: JST['search/main'],
  id: 'results-page',
  events: {
    'selected-panel': 'selectMarker',
    'map-search': 'mapSearch'
  },
  selectMarker: function(e, id) {
    this.rightpane.$el.trigger('select-marker', [id]);
  },
  initialize: function(options) {
    this.searched_location = options.query_params.location ;
    if (!this.searched_location){
      this.searched_location = [37.7034, -122.527];
      var alert = new LairDnD.Views.Alert({
        position: {
          v: 'top',
          h: 'left'
        },
        alert: 'No Location Found',
        info: 'Defaulting to "San Francisco"'
      });
      $('body').append(alert.render().$el);
    }
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
    });
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
  mapSearch: function(e, map) {
    var origin = map.getCenter();
    var bounds = map.getBounds();
    if (!origin || !bounds) {
      return;
    }
    var ne = bounds.getNorthEast();
    var range = google.maps.geometry.spherical.computeDistanceBetween(origin, ne) / 1609.34;
    this.collection.fetch({
      data: {
        search: {
          location: [origin.lat(), origin.lng()],
          range: range,
        }
      }
    });
  }
});
