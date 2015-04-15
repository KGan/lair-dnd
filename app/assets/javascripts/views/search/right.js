
LairDnD.Views.RightPane = Backbone.CompositeView.extend({
  template: JST['search/rightpane'],
  className: 'col-md-12',
  id: 'google-map',
  events: {
    'move-to': 'moveTo',
    'select-marker': 'selectMarker'
  },

  initialize: function(options) {
    window.rightpane = this;
    this.$el = options.$el;
    this.init_location = options.init_location;
    this.places_control = document.getElementById('nv-search');
    this.listenTo(this.collection, 'sync', this.loaded);
  },

  selectMarker: function(e, id) {
    if (this._selectedId) {
      this.markers()[this._selectedId].setAnimation(null);
    }
    this._selectedId = id;
    this.markers()[this._selectedId].setAnimation(google.maps.Animation.BOUNCE);

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
    
    this.infowindow = new google.maps.InfoWindow();


    this.searchMarkerImage = {
      url: '/assets/paleblue_MarkerV.png',
      size: new google.maps.Size(20, 32),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0,32)
    };
    this.searchMarkerShape = {
      coords: [ 1, 1, 1, 20, 18, 20, 18, 1 ],
      type: 'poly'
    };
    this.searchedPos = new google.maps.LatLng(parseFloat(this.init_location[0]), parseFloat(this.init_location[1]));
    //this.setSearchCenter(this.map, this.SearchMarkerImage, this.SearchMarkerShape, this.searchPos);

    setTimeout( function() {
      this.$el.trigger('move-to', [this.searchedPos]);
    }.bind(this), 0);
  },

  setSearchCenter: function() {
    if (this.searchMarker) this.searchMarker.setMap(null);
    this.searchMarker = new google.maps.Marker({
      map: this.map,
      image: this.searchMarkerImage,
      position: this.searchedPos,
      shape: this.searchMarkerShape,
      zIndex: 1
    });
  },

  markers: function() {
    if (this._markers === undefined) {
      this._markers = [];
    }
    return this._markers;
  },

  moveTo: function(e, g_geo) {
    if (g_geo.viewport){
      this.map.fitBounds(g_geo.viewport);
    } else {
      this.map.panTo(g_geo.location || g_geo);
      this.map.setZoom(13);
    }
  },

  addMarker: function(marker, id) {
    this.markers()[id] = marker;
  },
  resetMarkers: function() {
    _(this.markers()).each(function(marker, id){
      marker.setMap(null);
    });
    this._markers = {};
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
      var pos = listing.get('location');
      var listing_pos = new google.maps.LatLng(parseFloat(pos[0]), parseFloat(pos[1]));
      var newmarker = new google.maps.Marker({
        map: this.map,
        image: this.searchMarkerImage,
        position: listing_pos,
        shape: this.searchMarkerShape,
        title: listing.get('title') + ': ' + listing.get('location_name')
      });
      this.addMarker(newmarker, listing.id);
      google.maps.event.addListener(newmarker, 'click', function() {
        this.infowindow.setContent('<div><strong>' + newmarker.title + '</strong></div>');
        this.infowindow.open(this.map, newmarker);
      }.bind(this));
    }.bind(this));
  }
});
