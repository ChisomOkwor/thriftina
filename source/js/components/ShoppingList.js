var React = require('react');
var List = require('./List');
var AddListItem = require('./AddListItem');
var axios = require('axios');
var responseJson = ''
var target_total = 0;
var walmart_total = 0;
var showResult = false;

var ShoppingList = React.createClass({
  // export default class ShoppingList extends Component {

  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //         // isLoading: false,
  //         list: {},
  // cost = '',
  // isCheaper = '',
  // name = '',
  // supplier = ''


  //     };
  // }

  getInitialState: function () {
    return {
      list: [],
      responseTest: '',
      // cost: '',
      // isCheaper: '',
      // name = '',
      // supplier = '',
      doneButtonClicked: false,
      showResult: false,
      loading: false


    };
  },

  // handlePinButtonClick = () => {
  //   this.setState({
  //       isAllowedToSeeContent: true
  //   });
  // },

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
    this.setState({
      //...this.state,
      loading: true
    })

    var queries = ""
    for (const index in this.state.list) {
      queries = queries + this.state.list[index].name + ","
    }
    // if (index == 0) {
    //   alert("Please enter some items!");
    // }
    console.log(queries)
    // var url = ""
    // url = url + queries
    // console.log(url)
    // for (const thing in this.state.list) {
    //   console.log(`${thing["name"]}`);
    // }
    // console.log(this.state.list.join(','))
    const constructedUrl = "http://localhost:5000/api/" + queries;
    var axiosInstance = axios.create({
      baseURL: constructedUrl,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    });
    let self = this;


    this.setState({ isLoading: true }, () => {
      axiosInstance.get()
        .then(response => {
          if (response.status === 200) {
            var i;
            // var target_total = 0;
            // var walmart_total = 0;
            for (i = 0; response.data[i] != null; i++) {
              if (response.data[i].supplier == 'target') {
                target_total += response.data[i].cost;
              } else {
                walmart_total += response.data[i].cost;
              }
            }
            walmart_total = walmart_total.toFixed(2);
            target_total = target_total.toFixed(2);
            console.log("walmart: " + walmart_total)
            console.log("target: " + target_total)
            //showResult = true;
            // responseJson = JSON.parse(response.data)
            self.setState({
              // list: response.data,
              // responseTest: responseJson,
              //doneButtonClicked: true
              showResult: true,
              loading: false

            });
          } else {
            self.setState({
              didRequestFail: true,
              isLoading: false
            })
          }
        }).catch(error => {
          if (error.response && error.response.status === 403) { // Lambda/APIGW will return 403 for wrong code entered
            self.setState({
              isCodeWrong: true,
              isLoading: false
            });
          } else {
            if (error) {
              self.setState({
                didRequestFail: true,
                isLoading: false
              })
            }
          }
        });
    })
  },
  // return fetch(constructedUrl).then(res => res.json()); // do whatever with fetched data

  render: function () {
    console.log("loading: " + this.state.loading)

    var items = this.state.list;
    console.log("items to come")
    console.log("show: " + this.state.showResult)
    const rowStyle = {
      textAlign: "right",
      background: "#CED7DB"
    }
    const styleObj = {
      width: "130px",
      height: "130px",
      padding: "5px",
      background: "#CED7DB"
    }
    const storeObj = {
      width: "130px",
      height: "130px",
      padding: "5px",
    }
    const textStyle = {
      padding: "10px",
      color: "#5090AB",
      background: "#CED7DB"
    }
    const loadObj = {
      width: "50px",
      height: "50px",
    }
    console.log(target_total < walmart_total)


    console.log(showResult)

    if (this.state.showResult) {
      return (
        <div className="container">
          <div style={rowStyle} className="row">
            <div className="col-sm-6">
              <marquee><h4 style={textStyle}><i>Helps you save on all things shop.</i></h4></marquee>
            </div>
            <div className="col-sm-6">
              <div class="pb-3" >
                <img style={styleObj} class="title-img" src="/logo.png" />
              </div>
            </div>
          </div>
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
              <div>
                <div className="row">
                  <img style={storeObj} class="title-img" src="/Walmart-Logo.jpg" />
                  <img style={storeObj} class="title-img" src="/target-logo.jpg" />
                </div>
                <h3>Your total for Walmart is calculated to be about ${walmart_total}</h3>
                <h3>Your total for Target is calculated to be about ${target_total}</h3>


              </div>

            </div>

          </div>
        </div>
      );
    }
    // });

    return (
      <div className="container">
        <div style={rowStyle} className="row">
          <div className="col-sm-6">
            <marquee><h4 style={textStyle}><i>Helps you save on all things shop.</i></h4></marquee>
          </div>
          <div className="col-sm-6">
            <div class="pb-3" >
              <img style={styleObj} class="title-img" src="/logo.png" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <List
              items={items}
              removeListItem={this.removeListItem}
              removeAllListItems={this.removeAllListItems} />
            <button type="button" onClick={this.handleClickEvent} className="btn btn-link">Done</button>
            {!this.state.loading ?
              <i class="fas fa-search"></i> :
              <img width="70px" height="70px" class="title-img" src="/loading2.gif" />}
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
