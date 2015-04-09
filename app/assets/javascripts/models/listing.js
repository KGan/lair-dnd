LairDnD.Models.Listing = Backbone.Model.extend({
  urlRoot: '/api/listings',
  photos: function() {
    if (this._photos === undefined) {
      this._photos = new LairDnD.Collections.Photos();
    }
    return this._photos;
  },
  owner: function() {
    if (this._owner === undefined) {
      this._owner = new LairDnD.Models.User()
    }
    return this._owner;
  },

  parse: function(response) {
    if (response.user) {
      this.owner().set(response.user);
      delete response.user;
    }
    if (response.photos) {
      this.photos().set(response.photos);
      delete response.photos;
    }
    return response;
  }
});
