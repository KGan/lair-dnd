LairDnD.Routers.BaseRouter = Backbone.Router.extend({
  routes: {
  },
  initialize: function(options) {
    this.contents = options;
    this.views = {};
    this.collections = {
      listings: new LairDnD.Collections.Listings()
    };
    this._initViews();
    this.after_init(options);
  },

  after_init: function(options) {

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
      $navbar: this.contents.$navbar,
      collection: this.collections.listings
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
