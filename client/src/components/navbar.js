import React from "react";
import clsx from "clsx";
import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useMediaQuery, Button } from "@material-ui/core";

import { MenuItem } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import FastfoodIcon from "@material-ui/icons/Fastfood";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import dishName from "./../data/dishName";
import hawkerStalls from "./../data/hawkerStalls";
import hawkerCentre from "./../data/hawkerCentre";

import { DropzoneArea } from "material-ui-dropzone";
import Rating from "@material-ui/lab/Rating";
import { Box } from "@material-ui/core";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "40px",
  },
  appBar: {
    borderTop: "50px",
    color: "black",
    backgroundColor: "#fafafa",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    width: "75vw",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(4);
  const [uploadFiles, setUploadFiles] = useState("")

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //*=================DEALS WITH MOBILE VIEW DRAWER==================
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //*=================DEALS WITH POST MODAL==================
  const [openPost, setOpenPost] = useState(false);
  const handleOpenPost = () => {
    setOpenPost(true);
  };
  const handleClosePost = () => {
    setOpenPost(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* ====================NAVBAR FOR NONMOBILE====================*/}
      {!isMobile ? (
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              The Hawker Storey
            </Typography>
            <MenuItem component={RouterLink} to="/">
              <Typography variant="h6">Home</Typography>
            </MenuItem>
            <MenuItem component={RouterLink} to="/">
              <Typography variant="h6">Hawker</Typography>
            </MenuItem>
            <MenuItem component={RouterLink} to="/">
              <Typography variant="h6">Cuisine</Typography>
            </MenuItem>
            <MenuItem onClick={handleOpenPost}>
              <Typography variant="h6">Post</Typography>
            </MenuItem>
            <MenuItem component={RouterLink} to="/login">
              <Typography variant="h6">Login</Typography>
            </MenuItem>
            <MenuItem component={RouterLink} to="/signup">
              <Typography variant="h6">Sign Up</Typography>
            </MenuItem>
          </Toolbar>
        </AppBar>
      ) : (
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <Typography variant="h6" noWrap className={classes.title}>
                <FastfoodIcon />
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                className={clsx(open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {/* ====================NAVBAR FOR MOBILE====================*/}

            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
                <ChevronRightIcon />
              )}
          </IconButton>
        </div>
        <Divider />

        <List>
          <ListItem
            button
            component={RouterLink}
            onClick={handleDrawerClose}
            to="/"
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            onClick={handleDrawerClose}
            to="/"
          >
            <ListItemText primary="Hawker" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            onClick={handleDrawerClose}
            to="/"
          >
            <ListItemText primary="Cuisine" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            onClick={handleDrawerClose}
            to="/login"
          >
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            onClick={handleDrawerClose}
            to="/signup"
          >
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleOpenPost}>
            <ListItemText primary="Post" />
          </ListItem>
        </List>
      </Drawer>
      {/* ====================MODAL FOR POST==================== */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openPost}
        onClose={handleClosePost}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPost}>
          <div className={classes.paper}>
            <React.Fragment>
              <Typography variant="h4" gutterBottom>
                Add New Post
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    id="Hawker Centre"
                    options={hawkerCentre}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Hawker Centre"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    id="Hawker Stall"
                    options={hawkerStalls}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Hawker Stall"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Drag and drop an image here or click"}
                    filesLimit={1}
                    onChange={(files) => {
                      setUploadFiles(files)
                      console.log("Files:", files)
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id="Dish Name"
                    options={dishName}
                    getOptionLabel={(option) => option}
                    // style={{ width: "50vw" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Dish Name"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Review"
                    multiline
                    rows={4}
                    style={{ width: "100%" }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Rating
                    size="large"
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                  <Box textAlign="right">
                    <Button variant="contained" color="primary">
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </React.Fragment>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
