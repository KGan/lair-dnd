LairDnD.FormHelpers = {
  formAttrs: function(modelname, cb){
    if (this._formAttrs_ === undefined) {
      $.ajax({
        url: '/api/attrs/' + modelname,
        method: 'get',
        success: function(response) {
          this._formAttrs_ = response.form_attrs;
          cb();
        }.bind(this)
      });
    }
  }
};

LairDnD.MapHelpers = {
  poise: function(form) {
      form.attr('action', '/listings');
      form.attr('method', 'get');
  },
  extract: function(form, place) {
      form.append($('<input type="hidden" name="search[location][]" value="' + place.geometry.location.lat() + '">'));
      form.append($('<input type="hidden" name="search[location][]" value="' + place.geometry.location.lng() + '">'));
      form.append($('<input type="hidden" name="search[name]" value="' + place.name + '">'));
  }
};
