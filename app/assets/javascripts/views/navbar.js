LairDnD.Views.Navbar = Backbone.View.extend(
  _.extend({}, LairDnD.MapHelpers, {
    error_template: JST['shared/errors'],
    events: {
      "submit form.loginlogout": 'loginsignup',
      'click .new-space': 'newListing',
      'is-landing' : 'isLanding',
      'un-landing' : 'unLanding',
      'click .guest-login': 'guestLogin'
    },
    initialize: function(options) {
      this.$el = options.$navbar;
      this.navsearch = this.$('#navSearch');
      this.bindSearchBox();
    },
    isLanding: function() {
      this.navsearch.detach();
      this.$el.addClass('landing');
    },

    unLanding: function() {
      this.$('div.main-nav-container').append(this.navsearch);
      this.$el.removeClass('landing');
      this.bindSearchBox();
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
    guestLogin: function(e){
      e.preventDefault();
      var guestUser = {email: 'Guest', password: 'password'};
      m = new LairDnD.Models.Session();
      m.save(guestUser, {
        success: function() {
          location.reload(true);
        },
        error: function( model, response ) {
          var content = this.error_template({
            flash: _(response.responseJSON)
          });
         $('.flashes').html(content);
        }
      });
    },
    newListing: function(event){
      Backbone.history.navigate('/new-listing', true);
      // window.location.pathname = '/listings/new';
    },
    bindSearchBox: function(){
      this.searchBox = new google.maps.places.SearchBox(this.$('#nv-search').get(0));
      google.maps.event.addListener(this.searchBox, 'places_changed', this.search.bind(this));
    },
    search: function() {
      var place = this.searchBox.getPlaces()[0];
      if (place === undefined || !place.geometry) {
        return;
      }

      $('.rightpane').trigger('move-to', [place.geometry]);
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
        this.poise($form);
        this.extract($form, place);
        $form.submit();
      }
    }
  })
);
