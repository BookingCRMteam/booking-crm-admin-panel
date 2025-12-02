"use client";

import { Authenticated } from "@refinedev/core";
import { Box, Typography } from "@mui/material";

export default function OperatorsPage() {
  return (
    <Authenticated key="operators-page">
      <Box sx={{ p: 2 }}>
        <Typography variant="h1">Operators</Typography>
      </Box>
    </Authenticated>
  );
}
