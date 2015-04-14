LairDnD.Views.MainView = Backbone.CompositeView.extend({
  searchUrl: '/api/listings',
  events: {
    'submit .search-form': 'stopDefault'
  },
  initialize: function() {
    this.$el = $('body');
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

  stopDefault: function(e){
    e.preventDefault();
  }
});
