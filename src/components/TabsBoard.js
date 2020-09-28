import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { CircularProgress } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  //   labelContainer: {
  //     width: "auto",
  //     padding: 0,
  //   },
  //   iconLabelWrapper: {
  //     flexDirection: "row",

  //   },
}));

const ProcessTabsData = (tabData) => {
  console.log(Object.keys(tabData.data));
  var html = "";
  Object.keys(tabData.data).map((k, v) => {
    console.log(`Key: ${k} Value: ${v}`);
    let conData = tabData.data[k];
    conData.map((item) => {
      console.log(item);
      html = (
        <div className="keyword-section" key={k}>
          <h2>{k}</h2>
        </div>
      );
    });
  });
  return html;
};

export default function TabsBoard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("1");
  const tabsData = props.data.tabsData;
  console.log(tabsData);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="row mt-4">
      <div className="col-12">
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            scrollButtons="auto"
            aria-label="simple tab"
          >
            <Tab
              label="Alphabet"
              value="1"
              //   classes={{
              //     wrapper: classes.iconLabelWrapper,
              //     labelContainer: classes.labelContainer,
              //   }}
              icon={
                Object.keys(tabsData["Alphabet"]).length === 0 ? (
                  <CircularProgress size={20} />
                ) : (
                  ""
                )
              }
            />
            <Tab
              label="Comparison"
              value="2"
              icon={
                Object.keys(tabsData["Comparison"]).length === 0 ? (
                  <CircularProgress size={20} />
                ) : (
                  ""
                )
              }
            />
            <Tab
              label="Local"
              value="3"
              icon={
                Object.keys(tabsData["Local"]).length === 0 ? (
                  <CircularProgress size={20} />
                ) : (
                  ""
                )
              }
            />
            <Tab
              label="Numbers"
              value="4"
              icon={
                Object.keys(tabsData["Numbers"]).length === 0 ? (
                  <CircularProgress size={20} />
                ) : (
                  ""
                )
              }
            />
            <Tab
              label="Phrases"
              value="5"
              icon={
                Object.keys(tabsData["Phrases"]).length === 0 ? (
                  <CircularProgress size={20} />
                ) : (
                  ""
                )
              }
            />
            <Tab
              label="Questions"
              value="6"
              icon={
                Object.keys(tabsData["Questions"]).length === 0 ? (
                  <CircularProgress size={20} />
                ) : (
                  ""
                )
              }
            />
            <Tab
              label="Research"
              value="7"
              icon={
                Object.keys(tabsData["Research"]).length === 0 ? (
                  <CircularProgress size={20} />
                ) : (
                  ""
                )
              }
            />
            <Tab
              label="Shopping"
              value="8"
              icon={
                Object.keys(tabsData["Shopping"]).length === 0 ? (
                  <CircularProgress size={20} />
                ) : (
                  ""
                )
              }
            />
          </Tabs>
          <TabPanel value="1">
            {Object.keys(tabsData["Alphabet"]).length > 0 ? (
              <ProcessTabsData data={tabsData["Alphabet"]} />
            ) : (
              ""
            )}
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="4">Item One</TabPanel>
          <TabPanel value="5">Item Two</TabPanel>
          <TabPanel value="6">Item Three</TabPanel>
          <TabPanel value="7">Item One</TabPanel>
          <TabPanel value="8">Item Two</TabPanel>
        </TabContext>
      </div>
    </div>
  );
}
