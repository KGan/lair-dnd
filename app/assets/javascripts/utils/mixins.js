
LairDnD.Mixins.GOF = {
  getOrFetch: function(id) {
    var item = this.get(id);
    if (!item) {
      item = new this.model({id: id});
    }
    item.fetch({
      success: function(model) {
        this.add(model, {merge: true});
      }.bind(this)
    });

    return item;
  }
};

LairDnD.Mixins.SORT = {
  sort_by: function() {
    if (this._sort_by === undefined){
      this._sort_by = 'id';
    }
    return this._sort_by;
  },
  comparator: function(ab) {
    return ab.get(this.sort_by());
  }
};

LairDnD.Mixins.SORTABLE = {
  startSubsort: function(event, collection, index) {
    this._sorting_item = collection.at(index - 1);
    this._starting_collection = collection;
    this._starting_index = index - 1;
  },
  updateSubsort: function(event, collection, pos) {
    this._starting_collection.remove(this._sorting_item);
    collection.add(this._sorting_item, {at: pos});
    var collection_length = collection.length;
    collection.each(function (model, index) {
      var ident, lid;
      model.set('ord', index / collection_length);
      if (collection.list) {
        ident = 'list_id';
        lid = collection.list.get('id');
      }
      if (collection.board) {
        ident = 'board_id';
        lid = collection.board.get('id');
      }
      model.set(ident, lid);
      model.save();
    });
  }
};
