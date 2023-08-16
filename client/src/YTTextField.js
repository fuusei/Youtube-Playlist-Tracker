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
        placeholder="https://youtube.com/playlist?list=ExAmP13"
        helperText={props.errorText}
        FormHelperTextProps={{ sx: { color: "red" } }}
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
