import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

import { Link as RouterLink, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ setUserState }) {
  const classes = useStyles();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  const createUser = () => {
    fetch("/v1/users/", {
      method: "POST",
      body: JSON.stringify({
        username: userName,
        password: password,
        email: email,
        postalCode: postalCode,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Error in network");
      })
      .then((resJson) => {
        axios
          .post("/v1/sessions", {
            username: userName,
            password: password,
          })
          .then((res) => {
            console.log(res);
            setUserState(res.data);
            history.push(`/users/${res.data.user_id}`);
          })
          .catch((err) => console.log("error", err));
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoFocus
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                required
                id="email"
                label="Email Address"
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="postalCode"
                label="Postal Code"
                type="postalCode"
                id="postalCode"
                onChange={(event) => {
                  setPostalCode(event.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Button
            component={RouterLink}
            to="/"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          {/* ======================Lets work on this when no errors on submit==============================*/}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
