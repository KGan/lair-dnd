LairDnD.Views.Alert = Backbone.View.extend({
  templates: {
    alertMessage: JST['shared/alert']
  },
  events: {
    'mouseleave'  : 'dying'
  },
  className: 'ldd-alert',
  lifetime: function() {
    if (this._lifetime === undefined) {
      this._lifetime = 4000;
    }
    return this._lifetime;
  },
  position: function() {
    if (this._position === undefined) {
      this._position = {
        h: 'right',
        v: 'top'
      };
    }
    return this._position;
  },
  initialize: function(options) {
    this._lifetime = options.lifetime;
    this._position = options.position;
    this.alert = {
      heading: options.alert || ' ',
      info: options.info || ' '
    };
  },
  setClass: function() {
    this.className = 'alert-' + this.position().v + ' alert-' + this.position().h;
    this.$el.addClass(this.className);
  },
  render: function() {
    var alert = this.templates.alertMessage({
        alert: this.alert
    });
    this.$el.html(alert);
    this.$el.one('animationend webkitAnimationEnd oAnimationEnd', this.dying.bind(this));
    this.setClass();
    return this;
  },
  
  prolong: function() {
    this.$el.removeClass('alert-dying');
    if (this.death) clearTimeout(this.death);
  },
  dying: function() {
    this.$el.addClass('alert-dying');
    if (this.death) clearTimeout(this.death);
    this.death = setTimeout(this.remove.bind(this), this.lifetime());
  }
});

