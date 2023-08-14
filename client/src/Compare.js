import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import YTTextField from "./YTTextField";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";

function Compare() {
  const [error, setError] = useState(false);
  const [link, setLink] = useState("");
  const [file, setFile] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    !error && link && file ? setDisable(false) : setDisable(true);
  }, [link, file, error]);

  const handleValidation = (event) => {
    setLink(event.target.value);
    const playlistRegex = /^.*(youtu.be\/|list=)([^#&?]*).*/;
    const match = event.target.value.match(playlistRegex);
    match ? setError(false) : setError(true);
  };
  const handleSubmit = (e) => {
    console.log(link);
    // axios
    //   .post(
    //     "http://localhost:5000/compare",
    //     {URL: link, songs: []},
    //     { headers: { "Content-Type": "application/json" } }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };
  return (
    <React.Fragment>
      <YTTextField error={error} handleValidation={handleValidation} />
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
        disabled={disable}
        onClick={handleSubmit}
      >
        Compare
      </Button>
    </React.Fragment>
  );
}

export default Compare;
