"use client";

import { Box, CircularProgress } from "@mui/material";

export const CustomLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
};
