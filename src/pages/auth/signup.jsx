import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Typography,
  TextField,
  Checkbox,
  Grid,
  FormControlLabel,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { editUser } from "../../redux/users/user";
import { useDispatch } from "react-redux";
import Copyright from "./copyright";
import Facebook from "./facebook";
import Google from "./google";

const theme = createTheme();

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [remembered, setRemembered] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const url = process.env.REACT_APP_URL;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailErr("");
    setLoading(true);
    const username = firstName + " " + lastName;
    try {
      let res = await axios.post(`${url}signup`, {
        username,
        email,
        password,
      });
      dispatch(editUser({ user: res.data, remembered }));
    } catch (err) {
      console.log(err.response);
      setEmailErr(err.response.data.errors.email);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-back ">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="signup-box">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    InputLabelProps={{
                      style: { backgroundColor: "white", padding: "0 0.2rem" },
                    }}
                    inputProps={{ minLength: 3 }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    inputProps={{ minLength: 3 }}
                    autoComplete="family-name"
                    value={lastName}
                    InputLabelProps={{
                      style: { backgroundColor: "white", padding: "0 0.2rem" },
                    }}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    InputLabelProps={{
                      style: { backgroundColor: "white", padding: "0 0.2rem" },
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    inputProps={{ minLength: 5 }}
                    value={password}
                    InputLabelProps={{
                      style: { backgroundColor: "white", padding: "0 0.2rem" },
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="email-err">{emailErr}</div>

                  <FormControlLabel
                    control={<Checkbox value="RememberMe" color="primary" />}
                    label="Remember me."
                    onChange={() => setRemembered(!remembered)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
            {/* <Google />
                <Facebook /> */}
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
