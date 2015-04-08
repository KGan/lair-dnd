LairDnD.FormHelpers = {
  formAttrs: function(modelname){
    if (this._formAttrs_ === undefined) {
      $.ajax({
        url: '/api/attrs/' + modelname,
        method: 'get',
        success: function(response) {
          this._formAttrs_ = response.form_attrs;
        }.bind(this)
      });
    }
  }
};
