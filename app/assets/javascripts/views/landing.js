LairDnD.Views.Landing = Backbone.CompositeView.extend({
  template: JST['landing'],

  initialize: function(options) {
    this.renderSearch();
  },
  renderSearch: function() {
    this.searchbar = this.searchTemplate;
  },
  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.stretchBannerVideo();
    return this;
  },
  stretchBannerVideo: function() {
    var width = this.$('video.banner-video').width();
    var windowWidth = $(window).width();

    this.$('video.banner-video').css({
      'height'   : '550px',
      'transform': 'scaleX('+ windowWidth/width + ')'
    });

  }
});
