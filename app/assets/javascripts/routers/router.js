LairDnD.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'landing'
  },
  initialize: function(options) {
    this.contents = options;
    this.views = {};
    this._initViews();
  },

  landing: function() {
    
  },

  _initViews: function(){

  },

  _swapView: function(select, view) {
    if (this.views[select]) {
      this.views[select].remove();
    }
    this.views[select] = view;
    this.contents[select].html(view.render().$el);
  }
});
