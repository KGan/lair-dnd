LairDnD.Views.Searchbar = Backbone.CompositeView.extend({
  template: JST['shared/searchbar'],
  tagName: 'form',
  className: 'navbar-form navbar-left',
  events: {
    'submit': 'submit',
    'click .submit': 'submit'
  },
  initialize: function(options) {
    if (options.$searchbar) {
      this.$el = options.$searchbar;
      this._render = false;
    }
  },

  render: function() {
    if (!this._render) { return this; }
    var content = this.template({});
    this.$el.html(content);
    return this;
  },

  submit: function(e) {
    var searchData = this.$el.serializeJSON();

  }
});
