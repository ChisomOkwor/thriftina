var React = require('react');
var List = require('./List');
var AddListItem = require('./AddListItem');

var ShoppingList = React.createClass({

//   constructor(props) {
//     super(props);
//     this.state = {
//         isLoading: false
//     };
// }
  
  getInitialState: function () {
    return {
      list: {}
    };
  },

  updateList: function (newList) {
    this.setState({
      list: newList
    });
  },

  addListItem: function (item) {
    var list = this.state.list;

    list[item.id] = item;

    this.updateList(list);
  },

  removeListItem: function (itemId) {
    var list = this.state.list;

    delete list[itemId];

    this.updateList(list);
  },

  removeAllListItems: function () {
    this.updateList({});
  },

  handleClickEvent: function (event) {
    // var queries = Array.from(this.state.list).join(',')
    var queries = ""
    for (const index in this.state.list){
      queries = queries + this.state.list[index].name + ","
    }
    console.log(queries)
    // var url = ""
    // url = url + queries
    // console.log(url)
    // for (const thing in this.state.list) {
    //   console.log(`${thing["name"]}`);
    // }
    // console.log(this.state.list.join(','))
    const constructedUrl = "https://localhost:5000/api/" + queries;
    var axiosInstance = axios.create({
      baseURL: constructedUrl,
      // headers: {'LocationCode': this.state.passwd.toLowerCase()}
  });
  let self = this;
  this.setState({isLoading : true}, () => {
      axiosInstance.get()
      .then( response => {
          if (response.status === 200) {
              let responseJson = JSON.parse(response.data)
              self.setState({
                product: bread,
                  
              });
          } else {
              self.setState({
                  didRequestFail: true,
                  isLoading : false
              })
          }
      }).catch(error => {
          if (error.response && error.response.status === 403) { // Lambda/APIGW will return 403 for wrong code entered
              self.setState({
                  isCodeWrong: true,
                  isLoading : false
              });
          } else {
              if (error) {
                  self.setState({
                      didRequestFail: true,
                      isLoading : false
                  })
              }
          }
  });
  })
  },
    // return fetch(constructedUrl).then(res => res.json()); // do whatever with fetched data

  render: function () {
    var items = this.state.list;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">

          <List
              items={items}
              removeListItem={this.removeListItem}
              removeAllListItems={this.removeAllListItems} />
              <button type="button" onClick={this.handleClickEvent} className="btn btn-link">Done</button>
          </div>
          <div className="col-sm-6">
            <AddListItem addListItem={this.addListItem} />
          
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ShoppingList;
