LairDnD.Routers.LandingRouter = Backbone.Router.extend({
  routes: {
    '': 'default',
    'new-listing': 'newListing',
    'search': 'searchListing',
  },
  initialize: function(options) {
    this.contents = options;
    this.views = {};
    this.collections = {
      listings: new LairDnD.Collections.Listings()
    };
    this._initViews();
  },

  default: function() {
    var path = window.location.pathname;
    if (path.slice(0, path.indexOf('?')).length <= 2) {
      this.landing();
    } else {
      var listshowreg = path.match(/\/listings\/(\d+)/);
      if (listshowreg){
        var listing = new LairDnD.Models.Listing({
          id: parseInt(listshowreg[listshowreg.length - 1])
        });
        listing.fetch();
        this.showListing(listing.id);
      }
    }
  },

  landing: function() {
    this.views.navbar.$el.addClass('landing');
    var landingView = new LairDnD.Views.Landing();
    this._swapView('$rootEl', landingView);
  },

  showListing: function(id) {
    var model = this.collections.listings.getOrFetch(id);
    var listingView = new LairDnD.Views.ListingShow({
      model: model,
      $el: $('#listing-show')
    });
    this._swapView('$rootEl', listingView);
  },

  newListing: function() {
    var nlView = new LairDnD.Views.NewForm({
      model: new LairDnD.Models.Listing(),
      className: 'new-listing'
    });

    this._swapView('$rootEl', nlView);
  },

  _initViews: function(){
    //navbar and main(body) are fixed and nonchanging.
    this.views.navbar = new LairDnD.Views.Navbar({
      $navbar: this.contents.$navbar
    });

    this.views.main = new LairDnD.Views.MainView();
  },

  _swapView: function(select, view) {
    this._hideModals();
    if (this.views[select]) {
      this.views[select].remove();
    }
    this.views[select] = view;
    this.contents[select].html(view.$el);
    view.render();
  },

  _hideModals: function() {
    $('.modal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
});
