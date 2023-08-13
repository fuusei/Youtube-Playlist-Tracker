import React, { useState, useEffect } from "react";
import Compare from "./Compare";
import Playlist from "./Playlist";
import { Tabs, Tab, Grid } from "@mui/material";

function App() {
  const [songs, setSongs] = useState([{}]);
  const [tab, setTab] = useState("one");
  const handleTabChange = (event, value) => setTab(value);

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
          style={{ padding: 10 }}
        >
          <Grid
            container
            alignItems="center"
            direction="column"
            sx={{ height: 300 }}
          >
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
            {tab === "one" ? <Playlist /> : <Compare />}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
