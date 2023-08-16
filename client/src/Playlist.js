import React, { useState, useEffect } from "react";
import YTTextField from "./YTTextField";
import PublishIcon from "@mui/icons-material/Publish";
import axios from "axios";
import { saveAs } from "file-saver";
import LoadingButton from "@mui/lab/LoadingButton";

function Playlist() {
  const [error, setError] = useState(false);
  const [link, setLink] = useState("");
  const [disable, setDisable] = useState(true);
  const [failMsg, setFailMsg] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setFailMsg("");
    axios
      .post(
        "http://localhost:5000/getSongs",
        { URL: link },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        setLoading(false);
        try {
          let note = "";
          for (const song of res.data.songs) {
            note += song.name + " by [/ " + song.author + " /]\n";
          }
          var blob = new Blob([note], { type: "text/plain;charset=utf-8" });
          saveAs(blob, res.data.title.trim() + ".txt");
        } catch {
          setFailMsg(res.data);
        }
      })
      .catch((err) => {
        (err.code === "ERR_NETWORK") ? setFailMsg("Could not connect to server.") : setFailMsg(err.code);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <YTTextField
        error={error}
        handleValidation={handleValidation}
        errorText={failMsg}
      />
      <LoadingButton
        startIcon={<PublishIcon />}
        color="secondary"
        size="small"
        variant="contained"
        sx={{ m: 1, p: 1 }}
        disabled={disable}
        loading={loading}
        onClick={handleSubmit}
      >
        <span>Generate</span>
      </LoadingButton>
    </React.Fragment>
  );
}

export default Playlist;
