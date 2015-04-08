LairDnD.Views.Navbar = Backbone.View.extend({
  error_template: JST['shared/errors'],
  events: {
    "submit form": 'loginsignup'
  },
  initialize: function(options) {
    this.el = options.$navbar;
  },
  loginsignup: function(event) {
    var $form = $(event.currentTarget);
    var action = $form.$('input[type="submit"]').eq(0).data('action');
    if (action === 'login') {
      var m = new LairDnD.Models.Session();
    } else {
      var m = new LairDnD.Models.User();
    }
    m.set($form.serializeJSON().user);
    m.save({}, {
      success: function() {
        location.reload(true);
      },
      error: function(model, response) {
        var content = this.error_template({
          flash: responses
        });
      }
    })
  }
})
