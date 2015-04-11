LairDnD.Views.MainView = Backbone.CompositeView.extend({
  searchUrl: '/api/listings',
  events: {
    'click button.search': 'search',
  },
  initialize: function() {
    this.$el = $('body');
  },
  search: function(e) {
    var $form = $(e.currentTarget).closest('form');
    $form.attr('action', '/listings');
    $form.attr('method', 'get');
    $form.submit();
  },
});
