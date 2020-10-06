import React from "react";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import { CircularProgress } from "@material-ui/core";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import TabContext from "@material-ui/lab/TabContext";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import TabPanel from "@material-ui/lab/TabPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const headCells = [
  { id: "1", label: "Alphabet" },
  { id: "2", label: "Comparison" },
  { id: "3", label: "Local" },
  { id: "4", label: "Numbers" },
  { id: "5", label: "Phrases" },
  { id: "6", label: "Questions" },
  { id: "7", label: "Research" },
  { id: "8", label: "Shopping" },
];

const setHtmlText = (val) => (
  <text dangerouslySetInnerHTML={{ __html: val }} is="x3d"></text>
);

const ProcessTabsData = ({ data, header }) => {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography variant="h4" style={{ fontWeight: "500" }}>
        {header}
      </Typography>
      {data.length > 0
        ? data.map((val, index) => {
            let newVal = setHtmlText(val);
            return (
              <span className="d-flex pt-3" key={index}>
                <Chip label={newVal} />
              </span>
            );
          })
        : ""}
    </Paper>
  );
};

export default function TabsBoard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("1");
  const tabsData = props.data.tabsData || {};
  //console.log(tabsData.Alphabet);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
        >
          {headCells.map((headCell) => (
            <Tab
              label={headCell.label}
              value={headCell.id}
              key={headCell.id}
              icon={
                Object.keys(tabsData[headCell.label]).length === 0 ? (
                  <CircularProgress size={20} />
                ) : (
                  <CheckCircleOutlineRoundedIcon size={20} />
                )
              }
            />
          ))}
        </Tabs>
        {headCells.map((headCell) => (
          <TabPanel value={headCell.id} key={headCell.id}>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={2}>
                {Object.keys(tabsData[headCell.label]).length > 0
                  ? Object.keys(tabsData[headCell.label]).map((k, v) => {
                      return (
                        <Grid item xs={12} lg={6} md={6} key={k}>
                          <ProcessTabsData
                            data={tabsData[headCell.label][k]}
                            header={k}
                            key={k}
                          />
                        </Grid>
                      );
                    })
                  : ""}
              </Grid>
            </Grid>
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
}
