LairDnD.Views.Landing = Backbone.CompositeView.extend({
  template: JST['landing'],
  events: {
  },

  initialize: function(options) {
    this.renderSearch();
  },
  renderSearch: function() {
    this.searchbar = this.searchTemplate;
  },
  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.$('video.banner-video').on('loadedmetadata', this.stretchBannerVideo.bind(this));
    return this;
  },
  stretchBannerVideo: function(e) {
      this.$bannerVideo = $(e.currentTarget);
      var heightRatio = 550  / this.$bannerVideo.prop('videoHeight');
      var width = this.$bannerVideo.prop('videoWidth');
      var windowWidth = $(window).width();
      var widthRatio = windowWidth / width;

      this.$('video.banner-video').css({
        'height'   : '550',
        'transform': 'scaleX('+ widthRatio + ')'
      });
  }
});
