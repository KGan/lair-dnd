LairDnD.Views.Landing = Backbone.CompositeView.extend(
  _.extend({}, LairDnD.MapHelpers, {
    template: JST['landing'],
    events: {
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
      this.$('video.banner-video').on('loadedmetadata', this.stretchBannerVideo.bind(this));
      this.browseView = new LairDnD.Views.BrowseIndex(); ///////

      return this;
    },
    stretchBannerVideo: function(e) {
        this.$bannerVideo = $(e.currentTarget);
        var width = this.$bannerVideo.prop('videoWidth');
        var windowWidth = $(window).width();
        var widthRatio = windowWidth / width;

        this.$('video.banner-video').css({
          'height'   : '550',
          'transform': 'scaleX('+ widthRatio + ')'
        });
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
    }
  })
);
