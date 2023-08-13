import React, { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

function YTTextField() {
  const [error, setError] = useState(false);
  const handleValidation = (event) => {
    const playlistRegex = /^.*(youtu.be\/|list=)([^#&?]*).*/;
    const match = event.target.value.match(playlistRegex);
    match ? setError(false) : setError(true);
  };
  return (
    <React.Fragment>
      <TextField
        color="secondary"
        fullWidth
        required
        error={error}
        onChange={handleValidation}
        margin="normal"
        label="YouTube Playlist Link"
        id="YouTube Playlist Link"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkIcon />
            </InputAdornment>
          ),
        }}
      />
    </React.Fragment>
  );
}

export default YTTextField;
