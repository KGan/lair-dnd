LairDnD.Views.NewForm = Backbone.View.extend({
  template: JST['shared/new'],
  form_template: JST['shared/new_form'],
  events: {
    'click': 'renderForm',
    'submit form': 'submit',
    'blur': 'closeForm'
  },
  render: function() {
    var content = this.template();

    this.$el.html(content);
    return this;
  },
  renderForm: function(event) {
    if (this._formRendered || !this.model._formAttrs_) return;
    this._formRendered = true;
    var content = this.form_template({
      model: this.model,
      attributes: _(this.model._formAttrs_),
      naming: this.className
    });

    this.$el.html(content);
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
        Backbone.history.navigate(Backbone.history.fragment, {trigger: true});
      }
    });
  },
  closeForm: function(event) {
    this.render();
  }
});
