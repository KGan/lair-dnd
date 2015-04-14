LairDnD.Views.Navbar = Backbone.View.extend({
  error_template: JST['shared/errors'],
  events: {
    "submit form.loginlogout": 'loginsignup',
    'click .new-space': 'newListing',
    'is-landing' : 'isLanding'
  },
  initialize: function(options) {
    this.$el = options.$navbar;
    this.navsearch = this.$('#navSearch');
    this.bindSearchBox(this.$('#nv-search'));
  },
  isLanding: function() {
    this.navsearch.remove();
    this.$el.addClass('landing');
    this.bindSearchBox($('#search-input'));
  },
  loginsignup: function(event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var action = $form.data('action');
    var m;
    if (action === 'login') {
      m = new LairDnD.Models.Session();
    } else {
      m = new LairDnD.Models.User();
    }
    m.set($form.serializeJSON().user);
    m.save({}, {
      success: function() {
        location.reload(true);
      },
      error: function(model, response) {
        var content = this.error_template({
          flash: _(response.responseJSON)
        });
        $form.siblings('.flashes').html(content);
      }.bind(this)
    });
  },
  newListing: function(event){
    window.location.path = '/listings/new';
  },
  bindSearchBox: function($elem){
    this.searchBox = new google.maps.places.SearchBox($elem.get(0));
    google.maps.event.addListener(this.searchBox, 'places_changed', this.search.bind(this));
  },
  search: function() {
    var place = this.searchBox.getPlaces()[0];
    if (place === undefined || !place.geometry) {
      return;
    }

    place = place.geometry.location;

    if (LairDnD.current_router instanceof LairDnD.Routers.ListingRouter) {
      this.collection.fetch({
        data: {
          search: {
            location: [
              place.lat(), place.lng()
            ]
          }
        }
      });
    } else {
      var $form = $('<form>');
      $form.attr('action', '/listings');
      $form.attr('method', 'get');
      $('<input type="text" name="search[coords[lat]]" value=<%= place.lat() %>');
      $('<input type="text" name="search[coords[lng]]" value=<%= place.lng() %>');
      $form.submit();
    }
  }
});
