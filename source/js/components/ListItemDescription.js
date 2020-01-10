// Item description is not used in the current version of the app.
// This was left for posterity.
var React = require('react');

var ListItemDescription = function (props) {
    return (
      <div className="panel-body">
        {props.description}
      </div>
    );
};

module.exports = ListItemDescription;
