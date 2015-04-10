// modal and basic view are not subviews,
// the detail view will be its own view
// maps will be its own view

LairDnD.Views.ListingShow = Backbone.CompositeView.extend({
  photoModal_template: JST['listings/modal_photos'],
  initialize: function(options){
    this.$el = options.$el;
    this.listenTo(this.model, 'sync', this.render);
    this.carousel_id = 0;
  },
  events: {
    'click .thumbnail.selector': 'selectPhoto',
    'click #photoCarousel a.carousel-control': 'photoSlide',
    'click #thumbCarousel a.carousel-control': 'thumbSlide',
    'click .listing-expand': 'expandListing'
  },

  selectPhoto: function(e) {
    var idselect = $(e.currentTarget).data('c-id');
    var id = parseInt(idselect);
    this.$('#photoCarousel').carousel(id);
    this.$('#thumbCarousel').carousel((id / 5) | 0);
  },

  render: function(){
    this.renderModal();
    this.renderSeeMores();
    return this;
  },

  renderSeeMores: function(){
    var $seemore = $('<a href="javascript:void(0)">');
    $seemore.class('listing-expand');
    $seemore.text('See More')
    $('.listing-section').append($seemore);
  },

  expandListing: function(e) {
    var $clicked = $(e.currentTarget);
    $clicked.toggle(
      function(){
        this.animate({
          height: '100%'
        }, 1000);
        this.text('Collapse');
      }.bind($clicked.closest('.listing-section')),
      function(){
        this.animate({
          height: '150px'
        }, 1000);
        this.text('See More');
      }.bind($clicked.closest('.listing-section'))
    )
    var $section = $clicked.closest('listing-section')
    $section.toggleClass('expanded');
  },

  renderModal: function() {
    var modal = this.photoModal_template({
      photos: this.model.photos(),
      selected_id: this.carousel_id
    });
    this.$('#photoCarousel').carousel({
      interval: false
    });
    this.$('#thumbCarousel').carousel({
      keyboard: false,
      interval: false
    });
    this.$('.modal-content').html(modal);
  },

  thumbSlide: function(e){
    this.$('#thumbCarousel').carousel($(e.currentTarget).data('slide'));
  },
  photoSlide: function(e){
    this.$('#photoCarousel').carousel($(e.currentTarget).data('slide'));
  },

  renderBasic: function() {

  },
});
