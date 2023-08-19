import React, { useState } from "react";
import Compare from "./Compare";
import Playlist from "./Playlist";
import { Tabs, Tab, Grid, Typography } from "@mui/material";

function App() {
  const [tab, setTab] = useState("one");
  const handleTabChange = (event, value) => setTab(value);
  const views = {
    one: Playlist,
    two: Compare,
  };
  const CurrentView = views[tab];

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={8}>
          <img
            src="https://images.pexels.com/photos/7956373/pexels-photo-7956373.jpeg"
            style={{ width: "100%", height: "100%" }}
            alt="img"
          />
        </Grid>
        <Grid
          container
          item
          xs={4}
          alignItems="center"
          direction="column"
          justifyContent="center"
          style={{ padding: 14 }}
        >
          <Grid
            container
            alignItems="center"
            direction="column"
            sx={{ height: 500 }}
          >
            <Typography variant="h4" gutterBottom>
              YouTube Playlist Tracker
            </Typography>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="tabs"
            >
              <Tab value="one" label="Upload" />
              <Tab value="two" label="Compare" />
            </Tabs>
            <CurrentView />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
