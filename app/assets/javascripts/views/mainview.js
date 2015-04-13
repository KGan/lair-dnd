LairDnD.Views.MainView = Backbone.CompositeView.extend({
  searchUrl: '/api/listings',
  events: {
    'click button.search': 'search',
  },
  initialize: function() {
    this.$el = $('body');
  },
  search: function(e) {
    e.preventDefault();
    var $form = $(e.currentTarget).closest('form');
    $form.attr('action', '/listings');
    $form.attr('method', 'get');
    $form.submit();
  },

  setupDatepicker: function(startDate, endDate){
    startDate.datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        endDate.datepicker( "option", "minDate", selectedDate );
      }
    });
    endDate.datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        startDate.datepicker( "option", "maxDate", selectedDate );
      }
    });
  },
});
