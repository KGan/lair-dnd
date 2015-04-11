// modal and basic view are not subviews,
// the detail view will be its own view
// maps will be its own view

LairDnD.Views.ListingShow = Backbone.CompositeView.extend({
  photoModal_template: JST['listings/modal_photos'],
  initialize: function(options){
    this.$el = options.$el;
    this.listenTo(this.model, 'sync', this.render);
    this.setupBooking();
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

  setupBooking: function() {
    this.$bookingForm = $('.booking-form');
    this.bookstick = this.$bookingForm.offset().top;
    this.setupDatepicker();
    $(window).on('scroll.stick', this.scrollOrStick.bind(this));
  },

  setupDatepicker: function(){
    $( "#checkin" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#checkout" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#checkout" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#checkin" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  },

  scrollOrStick: function(e) {
    if($(window).scrollTop() > this.bookstick - 30) {
      this.$bookingForm.addClass('affixed');
    } else {
      this.$bookingForm.removeClass('affixed');
    }
  },

  render: function(){
    this.renderModal();
    this.renderSeeMores();
    return this;
  },

  renderSeeMores: function(){
    if(this._seemores) {
      return;
    }
    this._seemores = true;
    var $seemore = $('<a href="javascript:void(0)">');
    $seemore.addClass('listing-expand');
    $seemore.text('See More');
    $seemore.data('toggled', false);
    $('.listing-section').append($seemore);
  },

  expandListing: function(e) {
    var $clicked = $(e.currentTarget);
    var $parentSection = $clicked.closest('.listing-section');
    if ($clicked.data('toggled')) {
      $clicked.data('toggled', false);
      $parentSection.css({
        height: '150px'
      });
      $parentSection.find('a.listing-expand').text('See More');
    } else {
      $clicked.data('toggled', true);
      $parentSection.css({
        height: '100%'
      });
      $parentSection.find('a.listing-expand').text('Collapse');
    }

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
