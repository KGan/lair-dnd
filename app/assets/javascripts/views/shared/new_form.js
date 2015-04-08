LairDnD.Views.NewForm = Backbone.View.extend({
  template: JST['shared/new_form'],
  events: {
    'submit form': 'submit',
  },
  render: function() {
    if (!this.model.constructor._formAttrs_) {
      var cb = this.render.bind(this);
      LairDnD.FormHelpers.formAttrs.call(LairDnD.Models.Listing, 'listing', cb);
      return this;
    }

    var content = this.template({
      model: this.model,
      attributes: _(this.model.constructor._formAttrs_),
      naming: this.className
    });
    this.$el.html(content);
    filepicker.constructWidget(this.$('input[type="filepicker"]'));
    return this;
  },
  submit: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    if (this.collection.board) {
      formData.board_id = this.collection.board.get('id');
    }
    if (this.collection.list){
      formData.list_id = this.collection.list.get('id');
    }
    this.model.save(formData, {
      success: function(model) {
        Backbone.history.navigate('', {trigger: true});
      }
    });
  }
});
