var React = require('react');
//var uuid = require('node-uuid');
var list_index = 0;

var styleRequired = {
  color: "#ffaaaa"
};

var AddListItem = React.createClass({

  handleSubmitEvent: function (event) {
    event.preventDefault();
   
 
    var item = {
      //id: uuid.v4(),
      id: list_index++,
      
      // date: new Date(),
      name: this.refs.name.value.trim(),
      // description: this.refs.description.value.trim(),
      // quantity: this.refs.quantity.value
    };
     listItemNameInput.value = '';

    this.props.addListItem(item);
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmitEvent}>
        <h3 className="page-header">Add New Item</h3>
        <div className="form-group">
          <label htmlFor="listItemName">Name <span style={styleRequired}>*</span></label>
          <input type="text" className="form-control" id="listItemNameInput" placeholder="Enter item name" required ref="name" />
        </div>
        <hr />
        <button type="submit"  className="btn btn-link">Add to list</button>
        <button type="reset" className="btn btn-link">Cancel</button>
      </form>
    );
  }
});

module.exports = AddListItem;
