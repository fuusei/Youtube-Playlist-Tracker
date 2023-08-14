import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

function YTTextField(props) {
  return (
    <React.Fragment>
      <TextField
        color="secondary"
        fullWidth
        required
        error={props.error}
        helperText={props.errorText}
        onChange={props.handleValidation}
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
