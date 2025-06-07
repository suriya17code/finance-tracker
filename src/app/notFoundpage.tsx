'use client';

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"; // Changed icon
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      px={2}
      sx={{
        // backgroundImage: "url(/assets/common/forbidden-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      bgcolor="#f9f5ff"
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#A546FF", mb: 2 }} /> {/* New icon */}

      <Typography
        variant="h3"
        fontWeight={600}
        gutterBottom
        sx={{ color: "primary.main" }}
      >
        404
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        This page could not be found.
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        component={Link}
        href="/"
      >
        Go Back Home
      </Button>
    </Box>
  );
}
