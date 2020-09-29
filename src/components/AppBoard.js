import React, { Component } from "react";
import SearchBoard from "./SearchBoard";
import TabsBoard from "./TabsBoard";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

class AppBoard extends Component {
  constructor() {
    super();
    this.state = {
      mainLoader: false,
      searchInput: "",
      tabsData: [],
      processCount: "1/8",
      suggestionCount: "",
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onUpdateHandler = (value) => {
    this.setState(value);
  };

  handleSearch = () => {
    const { searchInput } = this.state;
    this.setState({ mainLoader: true });
    console.log("Search Submitted: " + searchInput);
    axios
      .get(`http://keywordbin.com/search?keyword=${searchInput}`)
      .then((res) => {
        console.log("Got response Id: " + res.data.id);
        axios
          .get(`http://keywordbin.com/status?id=${res.data.id}`)
          .then((resStat) => {
            let processStat = resStat.data.message;
            let processCount = resStat.data.processing_status;
            if (processStat === "complete") {
              console.log("Status Completed");
              this.setState({
                mainLoader: false,
                processCount: "1/8",
                tabsData: resStat.data.data,
                suggestionCount: resStat.data.suggestions_count,
              });
            } else {
              console.log("Still Need Processing");
              this.setState({
                processCount,
                tabsData: resStat.data.data,
                suggestionCount: resStat.data.suggestions_count,
              });
              setTimeout(() => {
                this.handleSearch();
              }, 5000);
            }
          });
      })
      .catch((e) => console.log(e.response.data));
  };

  render() {
    const { tabsData, suggestionCount } = this.state;
    return (
      <div className="container">
        <SearchBoard
          data={this.state}
          onUpdateHandler={this.onUpdateHandler}
          handleSearch={this.handleSearch}
        />
        {suggestionCount ? (
          <div className="mt-3">
            <Typography variant="h4" style={{ fontWeight: "400" }}>
              Total Keywords: {suggestionCount}
            </Typography>
          </div>
        ) : (
          ""
        )}
        {Object.keys(tabsData).length > 0 ? (
          <TabsBoard data={this.state} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default AppBoard;
