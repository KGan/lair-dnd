LairDnD.Models.Photo = Backbone.Model.extend({
  urlRoot: '/api/photos',
  
  ready: function() {
    return this.get('thumb_url') && this.get('photo_url') && this.get('listing_id');
  },
  addUrl: function(key, newBlob) {
    this.set(key, newBlob.url);
    this.trySave();
  },
  
  trySave: function(attrs, options) {
    attrs = attrs || {};

    this.set(attrs);
    options = options || {};
    if (this.ready()) {
      this.save({}, options);
    }
  }  
});
