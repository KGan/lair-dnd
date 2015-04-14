
LairDnD.Views.RightPane = Backbone.CompositeView.extend({
  template: JST['search/rightpane'],
  className: 'col-md-12',
  id: 'google-map',

  initialize: function(options) {
    this.$el = options.$el;
    this.places_control = document.getElementById('nv-search');
    this.listenTo(this.collection, 'sync', this.loaded);
  },

  initMap: function() {
    this.map = new google.maps.Map(this.$el.get(0), {
      mapTypeId: google.maps.MapTypeId.HYBRID
    });

    this.map_bounds = this.default_bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(37.7034, -122.527),
        new google.maps.LatLng(37.8121, -122.3482)
    );

    this.fitmap();
    this.searchMarker = new google.maps.Marker({
      map: this.map,
      anchorPoint: new google.maps.Point(0, -29)
    });
  },

  markers: function() {
    if (this._markers === undefined) {
      this._markers = [];
    }
    return this._markers;
  },

  addMarker: function(marker) {
    this.markers().push(marker);
  },
  fitmap: function() {
    this.map.fitBounds(this.map_bounds);
  },

  render: function() {
    var content = this.template({
      collection: this.collection
    });
    this.$el.html(content);
    return this;
  },

  loaded: function(collection) {
    collection.each(function(listing){

    });
  }
});
