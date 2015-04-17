LairDnD.Views.Navbar = Backbone.View.extend(
  _.extend({}, LairDnD.MapHelpers, {
    error_template: JST['shared/errors'],
    events: {
      "submit form.loginlogout": 'loginsignup',
      'click .new-space': 'newListing',
      'is-landing' : 'isLanding',
      'un-landing' : 'unLanding',
      'click .guest-login': 'guestLogin',
      'require-login-modal': 'modalWithError',
      'shown.bs.modal .modal': 'focusFirst',
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

    focusFirst: function(e) {
      var $shownModal = $(e.currentTarget);
      $shownModal.find('input.email').focus();
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
      this.bbLoginSignup(m, $form.serializeJSON().user);
    },

    bbLoginSignup: function(m, creds) {
      this.$('.modal .flashes').html('<i class="icon notched circle loading"></i>');
      m.save(creds, {
        success: function() {
          Backbone.history.navigate('/');
          location.reload(true);
        },
        error: function(model, response) {
          this.showModalFlashes(response.responseJSON);
        }.bind(this)
      });
    },

    modalWithError: function(e, err_message) {
      $('#login-modal').modal('toggle');
      this.showModalFlashes(err_message);
    },

    showModalFlashes: function(m) {
      var content = this.error_template({ flash: _(m) });
      this.$('.modal .flashes').html(content);
    },

    guestLogin: function(e){
      e.preventDefault();
      var guestUser = {email: 'Guest', password: 'password'};
      m = new LairDnD.Models.Session();
      this.bbLoginSignup(m, guestUser);
    },
    newListing: function(event){
      Backbone.history.navigate('/new-listing', true);
    },
    bindSearchBox: function(){
      this.searchBox = new google.maps.places.SearchBox(this.$('#nv-search').get(0));
      google.maps.event.addListener(this.searchBox, 'places_changed', this.search.bind(this));
    },
    search: function(gplace) {
      var place;
      if( gplace ) {
        place = gplace;
      } else {
        if (!this.searchBox.getPlaces()) return;
        place = this.searchBox.getPlaces()[0];
      }
      
      if (place === undefined || !place.geometry) {
        var alert = new LairDnD.Views.Alert({
          position: {
            v: 'top',
            h: 'left'
          },
          alert: "Sorry, no matching location found"
        });
        $('body').append(alert.render().$el);
        this.$('#nv-search').val('');
        return;
      }

      $('.rightpane').trigger('move-to', [place.geometry]);
      place_loc = place.geometry.location;

      if (LairDnD.current_router instanceof LairDnD.Routers.ListingRouter) {
        this.collection.fetch({
          data: {
            search: {
              location: [
                place_loc.lat(), place_loc.lng()
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
