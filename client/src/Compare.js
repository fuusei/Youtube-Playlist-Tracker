import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import YTTextField from "./YTTextField";
import Differences from "./Differences";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";

function Compare() {
  const [error, setError] = useState(false);
  const [link, setLink] = useState("");
  const [file, setFile] = useState("");
  const [disable, setDisable] = useState(true);
  const [failMsg, setFailMsg] = useState("");
  const [diff, setDiff] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    !error && link && file ? setDisable(false) : setDisable(true);
  }, [link, file, error]);

  const handleValidation = (event) => {
    setLink(event.target.value);
    const playlistRegex = /^.*(youtu.be\/|list=)([^#&?]*).*/;
    const match = event.target.value.match(playlistRegex);
    match ? setError(false) : setError(true);
  };
  const readFile = async (event) => {
    const myFile = event.target.files[0];
    if (!myFile) console.log("err");
    setFile(await myFile.text());
  };
  const handleSubmit = (e) => {
    setLoading(true);
    setFailMsg("");
    setDiff({});
    const existingPlaylist = [];
    const filePlaylist = file.split("\n");
    if (filePlaylist.length === 0)
      setFailMsg("Please check text file formatting.");
    for (let i = 0; i < filePlaylist.length - 1; ++i) {
      const line = filePlaylist[i].split(" by [/ ");
      const [song, author] = [line[0], line[1].slice(0, -3)];
      existingPlaylist.push({ name: song, author: author });
    }
    axios
      .post(
        "http://localhost:5000/compare",
        {
          URL: link,
          existingPlaylist: existingPlaylist,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        try {
          setDiff(res.data);
        } catch {
          setFailMsg(res.data);
        }
      })
      .catch((err) => {
        err.code === "ERR_NETWORK"
          ? setFailMsg("Could not connect to server.")
          : setFailMsg(err.code);
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
      <Button
        variant="contained"
        component="label"
        startIcon={<FileUploadIcon />}
        color="secondary"
        size="small"
        sx={{ m: 1, p: 1 }}
      >
        Upload Text File
        <input type="file" accept=".txt" hidden onChange={readFile} />
      </Button>
      <LoadingButton
        startIcon={<CompareArrowsIcon />}
        color="secondary"
        size="small"
        variant="contained"
        sx={{ m: 3, p: 1 }}
        disabled={disable}
        loading={loading}
        onClick={handleSubmit}
      >
        <span>Compare</span>
      </LoadingButton>
      {Object.keys(diff).length !== 0 && <Differences diff={diff} />}
    </React.Fragment>
  );
}

export default Compare;
