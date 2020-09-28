import React, { Component } from "react";
import SearchBoard from "./SearchBoard";
import axios from "axios";

class AppBoard extends Component {
  constructor() {
    super();
    this.state = {
      mainLoader: false,
      searchInput: "",
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
      .get(`search?keyword=${searchInput}`)
      .then((res) => {
        console.log("Got response Id: " + res.data.id);
        axios.get(`status?id=${res.data.id}`).then((resStat) => {
          console.log(resStat.data.data);
          let processStat = resStat.data.message;
          let processCount = resStat.data.processing_status;
          if (processStat === "complete") {
            console.log("Status Completed");
            this.setState({ mainLoader: false, processCount: "1/8" });
          } else {
            console.log("Still Need Processing");
            this.setState({ processCount });
            setTimeout(() => {
              this.handleSearch();
            }, 5000);
          }
        });
      })
      .catch((e) => console.log(e.response.data));
  };

  render() {
    const { mainLoader, searchInput } = this.state;
    return (
      <div>
        <SearchBoard
          data={this.state}
          onUpdateHandler={this.onUpdateHandler}
          handleSearch={this.handleSearch}
        />
      </div>
    );
  }
}

export default AppBoard;
