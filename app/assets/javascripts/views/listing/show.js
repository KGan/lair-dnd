LairDnD.Views.ListingShow = Backbone.CompositeView.extend({
  template: JST['listings/show'],
  photoModal_template: JST['listings/modal_photos'],
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
    this.carousel_id = 0;
  },
  className: 'listing-show',
  events: {
    'click .thumbnail.selector': 'selectPhoto',
    'click #photoCarousel a.carousel-control': 'photoSlide',
    'click #thumbCarousel a.carousel-control': 'thumbSlide',
  },

  selectPhoto: function(e) {
    var idselect = $(e.currentTarget).data('c-id');
    var id = parseInt(idselect);
    this.$('#photoCarousel').carousel(id);
    this.$('#thumbCarousel').carousel((id / 5) | 0);
  },

  render: function(){
    var content = this.template({
    });
    this.$el.html(content);
    this.renderModal();
    return this;
  },

  renderModal: function() {
    var modal = this.photoModal_template({
      //photos: this.model.photos,
      photos: _([1,2,3,4,5,6,7,8,9,10,1,2,10]),
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
  }

//jQuery(document).ready(function($) {

      // $('#myCarousel').carousel({
      //         interval: 5000
      // });
      //
      // $('#carousel-text').html($('#slide-content-0').html());
      //
      // //Handles the carousel thumbnails
      // $('[id^=carousel-selector-]').click( function(){
      //         var id_selector = $(this).attr("id");
      //         var id = id_selector.substr(id_selector.length -1);
      //         var id = parseInt(id);
      //         $('#myCarousel').carousel(id);
      // });
      //
      //
      // // When the carousel slides, auto update the text
      // $('#myCarousel').on('slid', function (e) {
      //         var id = $('.item.active').data('slide-number');
      //         $('#carousel-text').html($('#slide-content-'+id).html());
      // });
});
