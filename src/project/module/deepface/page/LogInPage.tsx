
import { Box, Grid, TextField, Button, Typography, Paper } from "@mui/material";
import BGImage from "../../../../assets/Picture1.jpg";
import Logo from "../../../../assets/Picture2.png"
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate()
  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", margin: 0.5, padding: 0.5 ,
      backgroundColor: "rgb(77, 75, 74)",
     }}>
      <Grid container spacing={0} sx={{ height: "100%" }}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              backgroundImage: `url(${BGImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>
        </Grid>

        {/* Login Form Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              padding: 4,
              rowGap: "60px",
              
            }}
          >
            <img src={Logo} />
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                width: "100%",
                maxWidth: 400,
                textAlign: "center",
              }}
            >
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Login
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ marginBottom: 2 }}
                onClick={() => navigate("/homepage")}
              >
                Login
              </Button>
              <Typography variant="body2">
                Don't have an account? <a href="/register">Register</a>
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
