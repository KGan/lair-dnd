LairDnD.Views.MainView = Backbone.CompositeView.extend({
  events: {
    'click button.search': 'search'
  },
  initialize: function() {
    this.$el = $('body');
  },
  search: function(e) {
    var $form = $(e.currentTarget).closest('form');
    var data = $form.find(':input').serializeJSON();
    $.ajax({
      
    })
  }
});
