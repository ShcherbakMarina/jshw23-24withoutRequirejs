define(
  'mvc',
  [],
  function Model(data) {
    var self = this;

    self.data = data;

    self.addItem = function(item) {
      if (item.length === 0) {
        return;
      }

      self.data.push(item);

      return self.data;
    };

    self.removeItem = function(item) {
      var index = self.data.indexOf(item);

      if (index === -1) {
        return;
      }

      self.data.splice(index, 1);

      return self.data;
    };

    self.editItem = function(item, newValue) {
      var index = self.data.indexOf(item);

      if ((index === -1) || (newValue == null)) {
        return;
      }

      self.data[index] = newValue;

      return self.data;
    };
  }
  function View(model) {
    var self = this;

    function init() {
      var wrapper = tmpl($('#wrapper-template').html());
      $('body').append(wrapper);
      self.elements = {
        input: $('.item-value'),
        addBtn: $('.item-add'),
        editBtn: $('.item-editBtn'),
        listContainer: $('.item-list')
      };
      self.renderList(model.data);
    };

    self.renderList = function(data) {
      var list = tmpl($('#list-template').html(), {data: data});
      self.elements.listContainer.html(list);
    };

    init();
  }
  function Controller(model, view) {
    var self = this;
    var editedItem;

    view.elements.addBtn.on('click', addItem);
    view.elements.listContainer.on('click', '.item-delete', removeItem);
    view.elements.listContainer.on('click', '.item-edit', editItem);
    view.elements.editBtn.on('click', saveEdit);

    function addItem() {
      var newItem = view.elements.input.val();

      model.addItem(newItem);
      view.renderList(model.data);
      view.elements.input.val('');
    }

    function removeItem() {
      var item = $(this).attr('data-value');

      model.removeItem(item);
      view.renderList(model.data);
    }


    function editItem() {
      editedItem = $(this).attr('data-value');

      view.elements.input.val(editedItem);
      view.elements.editBtn.css('display', 'inline-block');
      view.elements.addBtn.css('display', 'none');
    }

    function saveEdit() {
      var newValue = view.elements.input.val();

      model.editItem(editedItem, newValue);
      view.renderList(model.data);
      view.elements.input.val('');
      view.elements.editBtn.css('display', 'none');
      view.elements.addBtn.css('display', 'inline-block');
    }
  }
);
