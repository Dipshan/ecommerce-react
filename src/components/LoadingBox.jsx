import * as React from "react";
import {CircularProgress, Box} from "@mui/material";

export default function LoadingBox() {
  return (
    <Box style={{ display:"flex", gap:"10px", alignItems: "center" }} sx={{ display: "flex" }}>
      <CircularProgress />
      <h4>Loading...Please wait!!!</h4>
    </Box>
  );
}
