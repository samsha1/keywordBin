import React from "react";
import SearchBar from "material-ui-search-bar";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

export default function SearchBoard(props) {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 0 : prevProgress + 13.2
    );
  }, [props.data.processCount, setProgress]);

  const handleChange = (newValue) => {
    props.onUpdateHandler({ searchInput: newValue });
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  function ProcessingStat() {
    return (
      <div>
        <div className="d-flex mt-3 justify-content-center">
          <CircularProgress size={25} />
          <Typography
            variant="h6"
            style={{ marginLeft: "15px", fontWeight: "800" }}
          >
            Getting {props.data.processCount}
            ....
          </Typography>
        </div>
        <div>
          <LinearProgressWithLabel value={progress} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="row">
        <div className="col-12 text-center mt-4">
          <Typography variant="h4" style={{ fontWeight: "800"}}>
            Keyword Generator
          </Typography>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12">
          <SearchBar
            placeholder="Search Keyword"
            onChange={(newValue) => handleChange(newValue)}
            value={props.data.searchInput}
            disabled={props.data.mainLoader}
            onRequestSearch={props.handleSearch}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {props.data.mainLoader ? <ProcessingStat /> : ""}
        </div>
      </div>
    </div>
  );
}
