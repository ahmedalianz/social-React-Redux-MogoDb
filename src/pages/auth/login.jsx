import "./login.css";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { editUser, loginFail } from "../../redux/users/user";

import Copyright from "./copyright";
import Facebook from "./facebook";
import Google from "./google";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const theme = createTheme();

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [remembered, setRemembered] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const url = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailErr("");
    setPasswordErr("");
    setLoading(true);
    try {
      let res = await axios.post(`${url}login`, { email, password });
      console.log(res);
      dispatch(editUser({ user: res.data, remembered }));
    } catch (err) {
      console.error(err.response);
      setEmailErr(err.response.data.errors.email);
      setPasswordErr(err.response.data.errors.password);
      dispatch(loginFail());
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          className="login-background"
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{
                  style: { backgroundColor: "white", padding: "0 0.2rem" },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="email-err">{emailErr}</div>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                type="password"
                autoComplete="current-password"
                InputLabelProps={{
                  style: { backgroundColor: "white", padding: "0 0.2rem" },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="email-err">{passwordErr}</div>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                onChange={() => setRemembered(!remembered)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Log In
              </Button>
              <Grid container className="signin-links">
                <Grid item xs sx={{ mr: 2 }}>
                  <Link to="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
            {/* <Google />
                        <Facebook /> */}
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
