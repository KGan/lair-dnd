LairDnD.Views.MainView = Backbone.CompositeView.extend({
  templates: {
  },
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
      dateFormat: 'yy-mm-dd',
      minDate: "+1d",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        endDate.datepicker( "option", "minDate", selectedDate );
      }
    });
  endDate.datepicker({
      defaultDate: "+1w",
      dateFormat: 'yy-mm-dd',
      minDate: "+1d",
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
