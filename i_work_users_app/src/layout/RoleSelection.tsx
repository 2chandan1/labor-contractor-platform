import { Box, Card, CardActionArea, Typography, Stack } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
    const navigate=useNavigate();
  const roles = [
    {
      title: "Labour",
      description:
        "Connect with quality projects and build your professional reputation as a skilled worker",
      icon: <PeopleIcon sx={{ fontSize: 60 }} />,
      color: "#2979FF", // Blue accent
      gradient: "linear-gradient(145deg, #1E88E5, #42A5F5)",
      onclick: () => navigate("/register/labour"),
    },
    {
      title: "Contractor",
      description:
        "Post projects, manage teams, and find the perfect skilled workers for your business",
      icon: <BusinessCenterIcon sx={{ fontSize: 60 }} />,
      color: "#00C853", // Green accent
      gradient: "linear-gradient(145deg, #00C853, #69F0AE)",
        onclick: () => navigate("/register/constructor"),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0B1221 0%, #1A2238 100%)", // dark navy gradient
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 8,
        color: "white",
      }}
    >
      {/* Top label */}
      <Typography
        variant="button"
        sx={{
          background: "rgba(255,255,255,0.1)",
          px: 2,
          py: 0.5,
          borderRadius: 2,
          mb: 2,
        }}
      >
        Choose Your Path
      </Typography>

      {/* Main heading */}
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Join Our Platform
      </Typography>

      {/* Subtext */}
      <Typography variant="body1" color="grey.400" mb={6}>
        Whether you're a skilled worker or a project manager, find the perfect match
      </Typography>

      {/* Role cards */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        sx={{ width: "100%", maxWidth: 900, justifyContent: "center" }}
      >
        {roles.map((role) => (
          <Card
            key={role.title}
            sx={{
              flex: 1,
              borderRadius: 4,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              textAlign: "center",
              color: "white",
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
              transition: "all 0.4s ease",
              "&:hover": {
                background: role.gradient,
                transform: "translateY(-8px)",
                boxShadow: `0 0 30px ${role.color}88`,
              },
            }}
            onClick={role.onclick}
          >
            <CardActionArea sx={{ p: 5 }}>
              <Box
                sx={{
                  bgcolor: role.color,
                  color: "white",
                  borderRadius: "50%",
                  width: 90,
                  height: 90,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                  transition: "all 0.3s ease",
                  boxShadow: `0 0 20px ${role.color}99`,
                }}
              >
                {role.icon}
              </Box>

              <Typography variant="h5" fontWeight={700} mb={1}>
                {role.title}
              </Typography>
              <Typography
                variant="body2"
                color="rgba(255,255,255,0.85)"
                sx={{ mb: 2, minHeight: 60 }}
              >
                {role.description}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.95)",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                Get Started <ArrowForwardIcon fontSize="small" />
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
