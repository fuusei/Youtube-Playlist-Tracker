import React from "react";
import { Button } from "@mui/material";
import YTTextField from "./YTTextField";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FileUploadIcon from "@mui/icons-material/FileUpload";

function Compare() {
  return (
    <React.Fragment>
      <YTTextField />
      <Button
        variant="contained"
        component="label"
        startIcon={<FileUploadIcon />}
        color="secondary"
        size="small"
        sx={{ m: 1, p: 1 }}
      >
        Upload Text File
        <input type="file" accept=".txt" hidden />
      </Button>
      <Button
        startIcon={<CompareArrowsIcon />}
        color="secondary"
        size="small"
        variant="contained"
        sx={{ m: 3, p: 1 }}
      >
        Compare
      </Button>
    </React.Fragment>
  );
}

export default Compare;
