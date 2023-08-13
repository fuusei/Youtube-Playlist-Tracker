import React from "react";
import YTTextField from "./YTTextField";
import { Button } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

function Playlist() {
  return (
    <React.Fragment>
      <YTTextField />
      <Button startIcon={<PublishIcon />} color="secondary" size="small" variant="contained" sx={{m: 1, p: 1}}>
        Generate
      </Button>
    </React.Fragment>
  );
}

export default Playlist;
