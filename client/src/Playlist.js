import React, { useState, useEffect } from "react";
import YTTextField from "./YTTextField";
import { Button } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import axios from "axios";
import { saveAs } from "file-saver";

function Playlist() {
  const [error, setError] = useState(false);
  const [link, setLink] = useState("");
  const [disable, setDisable] = useState(true);
  const [failMsg, setFailMsg] = useState("");

  useEffect(() => {
    !error && link ? setDisable(false) : setDisable(true);
  }, [link, error]);

  const handleValidation = (event) => {
    setLink(event.target.value);
    const playlistRegex = /^.*(youtu.be\/|list=)([^#&?]*).*/;
    const match = event.target.value.match(playlistRegex);
    match ? setError(false) : setError(true);
  };
  const handleSubmit = () => {
    setFailMsg("")
    axios
      .post(
        "http://localhost:5000/getSongs",
        { URL: link },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        try {
          let note = '';
          for (const song of res.data.songs) {
            note += song.name + " by [/ " + song.author + " /]\n";
          }
          var blob = new Blob([note], { type: "text/plain;charset=utf-8" });
          saveAs(blob, res.data.title.trim() + ".txt");
        }
        catch {
          setFailMsg(res.data);
        }
      });
  };
  return (
    <React.Fragment>
      <YTTextField error={error} handleValidation={handleValidation} errorText={failMsg}/>
      <Button
        startIcon={<PublishIcon />}
        color="secondary"
        size="small"
        variant="contained"
        sx={{ m: 1, p: 1 }}
        disabled={disable}
        onClick={handleSubmit}
      >
        Generate
      </Button>
    </React.Fragment>
  );
}

export default Playlist;
