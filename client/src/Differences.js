import React from "react";
import { Typography } from "@mui/material";

function Differences(props) {
  const { deleted, added } = props.diff;
  console.log(deleted);
  console.log(added);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Differences
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Deleted: {deleted.length ? deleted.join(", ") : "None"}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Added: {added.length ? added.join(", ") : "None"}
      </Typography>
    </React.Fragment>
  );
}

export default Differences;
