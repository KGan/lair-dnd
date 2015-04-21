LairDnD.Views.Landing = Backbone.CompositeView.extend(
  _.extend({}, LairDnD.MapHelpers, {
    template: JST['landing'],
    events: {
      'featured-search form.landsearch': 'featuredSearch'
    },

    initialize: function(options) {
      this.navView = options.navView;
      options.navView.$el.trigger('is-landing', this);
    },
    setupSearch: function() {
      this.$searchbar = this.$('.full-search-form');
      var ci = this.$searchbar.find(' #checkin ');
      var co = this.$searchbar.find(' #checkout ');
      LairDnD.Views.MainView.prototype.setupDatepicker(ci, co);
      this.$form = this.$searchbar.closest('form');
      this.poise(this.$form);
    },
    render: function() {
      var content = this.template();
      this.$el.html(content);
      this.setupSearch();
      this.bindSearchForm();
      this.setupVideos();
      this.featuredLocations = new LairDnD.Collections.FeaturedLocations();
      this.featuredLocations.fetch();
      this.browseView = new LairDnD.Views.BrowseIndex({collection: this.featuredLocations}); 
      this.$el.append(this.browseView.render().$el);

      return this;
    },
    setupVideos: function() {
      this.video = this.$('video.banner-video');
    },
    bindSearchForm: function() {
        this.searchBox = new google.maps.places.SearchBox(this.$('#search-input').get(0));
        google.maps.event.addListener(this.searchBox, 'places_changed', this.processLocationToForm.bind(this));
    },
    processLocationToForm: function() {
        var place = this.searchBox.getPlaces()[0];
        if (place === undefined || !place.geometry) {
          return;
        }
        this.extract(this.$form, place);
    },
    featuredSearch: function(e, m) {
      $(e.currentTarget).html($('<input type="hidden" name="search[location][]" value="' + m.get('latitude') + '">'));
      $(e.currentTarget).append($('<input type="hidden" name="search[location][]" value="' + m.get('longitude') + '">'));
      $(e.currentTarget).submit();

    }

  })
);
