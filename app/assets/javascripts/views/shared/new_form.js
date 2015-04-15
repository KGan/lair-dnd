LairDnD.Views.NewForm = Backbone.View.extend({
  template: JST['shared/new_form'],
  events: {
    'submit form': 'submit',
  },
  initialize: function(options) {
    this.stage = options.stage || 'basics';
  },
  render: function() {
    if (!this.model.constructor._formAttrs_) {
      var cb = this.render.bind(this);
      LairDnD.FormHelpers.formAttrs.call(LairDnD.Models.Listing, 'listing', cb);
      return this;
    }

    var content = this.template({
      model: this.model,
      attributes: _(this.model.constructor._formAttrs_[this.stage]),
      amenities: _(this.model.constructor._formAttrs_['amenities']),
      naming: this.className
    });
    this.$el.html(content);
    this.bindPlugins();
    return this;
  },

  bindPlugins: function() {

  },
  submit: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function(model) {
        Backbone.history.navigate('', {trigger: true});
      }
    });
  }
});
