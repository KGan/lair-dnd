LairDnD.Views.Navbar = Backbone.View.extend({
  error_template: JST['shared/errors'],
  events: {
    "submit form": 'loginsignup',
    'click .new-space': 'newListing'
  },
  initialize: function(options) {
    this.$el = options.$navbar;
    // this.delegateEvents();
  },
  loginsignup: function(event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var action = $form.data('action');
    var m; 
    if (action === 'login') {
      m = new LairDnD.Models.Session();
    } else {
      m = new LairDnD.Models.User();
    }
    m.set($form.serializeJSON().user);
    m.save({}, {
      success: function() {
        location.reload(true);
      },
      error: function(model, response) {
        var content = this.error_template({
          flash: _(response.responseJSON)
        });
        $form.siblings('.flashes').html(content);
      }.bind(this)
    });
  },
  newListing: function(event){
    Backbone.history.navigate('new-listing', {trigger: true});
  }
});
