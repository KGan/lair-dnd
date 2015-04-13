LairDnD.Views.SearchMain = Backbone.CompositeView.extend({
  template: JST['search/main'],
  id: 'results-page',
  
  initialize: function(options) {    
    this.collection.fetch({
      data: { search: options.query_params }  
    });
  },
  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.addSubview('.leftpane', new LairDnD.Views.LeftPane({
      $el: $('.leftpane'),
      collection: this.collection
    })); 
    var rightpane = new LairDnD.Views.RightPane({
      $el: $('.rightpane'),
      collection: this.collection
    });
    this.addSubview('.rightpane', rightpane); 
    rightpane.initMap();
 
    
    return this;
  },
});
