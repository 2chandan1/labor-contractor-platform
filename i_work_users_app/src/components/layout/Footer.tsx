import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 4,
        py: 2,
        bgcolor: "grey.200",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} iWork. All rights reserved.
      </Typography>
    </Box>
  );
}
