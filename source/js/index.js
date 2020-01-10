var React = require('react');
var ReactDOM = require('react-dom');
var ShoppingList = require('./components/ShoppingList');

// format to pass info is name="info_to_pass"; ultimately not needed here but for future ref
ReactDOM.render(<ShoppingList />, document.querySelector('[data-react-application]'));
