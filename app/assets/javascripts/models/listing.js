LairDnD.Models.Listing = Backbone.Model.extend({
  urlRoot: '/api/listings',
  owner: function() {
    return this._owner;
  },

  parse: function(response) {
    if (response.user) {
      this.owner = response.user;
      delete response.user;
    }
    return response;
  }
});

LairDnD.FormHelpers.formAttrs.call(LairDnD.Models.Listing, 'listing');
