define(
  'controller',
  [
    'model',
    'view'
  ],
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
