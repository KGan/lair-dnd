LairDnD.Views.Searchbar = Backbone.CompositeView.extend({
  template: JST['shared/searchbar'],
  tagName: 'form',
  className: 'navbar-form navbar-left',
  events: {
    'submit': 'submit',
    'click .submit': 'submit'
  },
  initialize: function(options) {
    if (options.$searchbar) {
      this.$el = options.$searchbar;
      this._render = false;
      this.setupDatepicker();
    }
  },

  render: function() {
    if (!this._render) { return this; }
    var content = this.template({});
    this.$el.html(content);
    this.setupDatepicker();
    return this;
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

  submit: function(e) {
    var searchData = this.$el.serializeJSON();

  }
});
