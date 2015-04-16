LairDnD.Views.NewForm = Backbone.View.extend(
  _.extend({}, LairDnD.MapHelpers, {
  template: JST['shared/new_form'],
  events: {
    'submit form': 'submit',
    'click button.filepick': 'openFilepicker'
  },
  initialize: function(options) {
    this.stage = options.stage || 'basics';
  },
  render: function() {
    if (!this.model.constructor._formAttrs_) {
      var cb = this.render.bind(this);
      LairDnD.FormHelpers.formAttrs.call(LairDnD.Models.Listing, 'listing', cb);
      return this;
    }

    var content = this.template({
      model: this.model,
      attributes: _(this.model.constructor._formAttrs_[this.stage]),
      amenities: _(this.model.constructor._formAttrs_.amenities),
    });
    this.$el.html(content);
    this.bindPlugins();
    return this;
  },

  openFilepicker: function(e) {
    e.preventDefault();
    services = "BOX,COMPUTER,DROPBOX,FACEBOOK,GOOGLE_DRIVE,FLICKR,GMAIL,INSTAGRAM,URL";
    filepicker.pickMultiple({
      mimetype: 'image/*',
      container: 'modal',
      services: services.split(',')
    },
    this.processUploadedImages.bind(this),
    function(FPError) {
      //var alert = new LairDnD.Views.Alert({

        // this.$el.append(alert.render().$el);
      //});
    });
  },

  appendLocation: function() {
    var place = this.gsearch.getPlaces()[0];
    if (!place || !place.geometry) return;
    this.extract(this.$('form'), place);
  },

  bindPlugins: function() {
    filepicker.setKey("Am4pdKMVZS3i6kwFiJnYgz");
    this.gsearch = new google.maps.places.SearchBox(this.$('.listing-options input#location').get(0));
    google.maps.event.addListener(this.gsearch, 'places_changed', this.appendLocation.bind(this));
  },
  processUploadedImages: function(Blobs) {
    this.photosCollection = new LairDnD.Collections.Photos([], {
      listing: this.model
    });
    _(Blobs).each(function(blob){
      var photo = new LairDnD.Models.Photo();
      this.photosCollection.add(photo);
      filepicker.convert(
        blob,
        { width: 800, height: 600, fit: 'scale' },
        photo.addUrl.bind(photo, 'photo_url')
      );
      filepicker.convert(
        blob,
        { width: 170, height: 170, fit: 'scale' },
        photo.addUrl.bind(photo, 'thumb_url')
      );
    }.bind(this));
  },
  submit: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function(model) {
        Backbone.history.navigate('/', {trigger: true});
      },
      error: function(model, response) {
        if ( response.status === 403 && response.responseJSON ) {
          $('#login-modal').trigger('require-login-modal', [response.responseJSON]);
        } else {
          var alert = new LairDnD.Views.Alert({
           alert: 'Error: ' + response.status,
           info: response.responseJSON ? response.responseJSON.errors : ''
         });
         this.$el.append(alert.render().$el);
        }
      }.bind(this)
    });
  }
}));
