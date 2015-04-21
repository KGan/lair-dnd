LairDnD.Views.NewReview = Backbone.View.extend({
  templates: {
    'new' : JST['reviews/new']
  },
  events: {
    'submit': 'submit',
    'click i.star': 'selectRating',
    'mouseenter i.star': 'previewRating',
    'mouseleave i.star': 'showRating'
  },
  tagName: 'form',
  className: 'new-review',
  initialize: function(options) {
    this.listing_id = options.listing_id;
  },
  render: function() {
    var content = this.templates['new']();
    this.$el.html(content);
    return this;
  },
  selectRating: function(e) {
    var $selected = $(e.currentTarget);
    this.rating = $selected.data('id');
    this.showRating();
  },
  previewRating: function(e) {
    var tmpRating = $(e.currentTarget).data('id');
    this.highlightRating(tmpRating);
  },
  showRating: function() {
    this.highlightRating(this.rating);
  },
  highlightRating: function(rating) {
    this.$('#rating i.star').each(function(){
      if( $(this).data('id') <= rating ) {
        $(this).addClass('yellow');
        $(this).removeClass('empty');
      } else {
        $(this).addClass('empty');
        $(this).removeClass('yellow');
      }
    });

  },
  submit: function(e) {
    e.preventDefault();
    var formData = _.extend({
      listing_id: this.listing_id,
      rating: this.rating
    }, this.$el.serializeJSON());
    this.model.save(formData, {
      success: function(model, response) {
        this.collection.add(model);
        this.$(':input').val('');
      }.bind(this),
      error: function(model, response) {
        if(response.status === 403 && response.responseJSON){
          $('#login-modal').trigger('require-login-modal', [response.responseJSON]);
        } else {
          var alert = new LairDnD.Views.Alert({
            alert: 'Error: ' + response.statusText,
            info: response.responseJSON ? (response.responseJSON.errors ? response.responseJSON.errors : response.responseJSON ) : ""
          });
          $('body').append(alert.render().$el);
        }
      }.bind(this)
    });
  }
});
