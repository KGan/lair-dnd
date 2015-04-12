LairDnD.Views.Landing = Backbone.CompositeView.extend({
  template: JST['landing'],
  events: {
  },

  initialize: function(options) {
    options.navView.$el.trigger('is-landing', this);
  },
  setupSearch: function() {
    this.$searchbar = this.$('full-search-form');
    var ci = this.$searchbar.find(' #checkin ');
    var co = this.$searchbar.find(' #checkout ');
    LairDnD.Views.MainView.prototype.setupDatepicker(ci, co);
  },
  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.setupSearch();
    this.$('video.banner-video').on('loadedmetadata', this.stretchBannerVideo.bind(this));
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
  }
});
