LairDnD.Views.FLCard = Backbone.View.extend({
  template:JST['browse/card'],
  events: {
    'click' : 'searchFeaturedLocation'
  },
  initialize: function(options) {
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude'));
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
        this.gplace = results[1];
      } else {
      }
    }.bind(this));
  },
  render: function() {
    var content = this.template({
      location: this.model
    });
    this.$el.html(content);
    return this;
  },
  searchFeaturedLocation: function() {
    $('nav.navbar').trigger('featured-search', [this.gplace]);
  }

});
