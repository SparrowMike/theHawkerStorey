import React from "react";
import clsx from "clsx";
import { useState } from "react";
import {
  makeStyles,
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  List,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  MenuItem,
  ListItemText,
  ListItem,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FastfoodIcon from "@material-ui/icons/Fastfood";

import { Link as RouterLink } from "react-router-dom";

import Post from "./Post";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "20px",
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
    overflow: "scroll",
    display: "block",
    padding: theme.spacing(11),
  },
  modalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));


export default function Navbar({ userState, setUserState, setLoaded, loaded }) {
  userState,
  setUserState,
  loggedIn,
  setLoggedIn,
}) {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  console.log(userState);

  //*=================DEALS WITH MOBILE VIEW DRAWER==================
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //*=================DEALS WITH WITH LOGOUT==================

  const handleLogout = () => {
    handleDrawerClose();
    document.cookie = "cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    setUserState({});
    setLoggedIn(false);
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
            {loggedIn ? (
              <>
                <MenuItem onClick={handleOpenPost}>
                  <Typography variant="h6">Create Post</Typography>
                </MenuItem>

                {/* <MenuItem onClick={handleUserProfile}> */}
                <MenuItem
                  component={RouterLink}
                  to={`/users/${userState.user_id}`}
                >
                  <Typography variant="h6">My Profile</Typography>
                </MenuItem>

                <MenuItem component={RouterLink} to="/" onClick={handleLogout}>
                  <Typography variant="h6">Logout</Typography>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem component={RouterLink} to="/login">
                  <Typography variant="h6">Login</Typography>
                </MenuItem>
                <MenuItem component={RouterLink} to="/signup">
                  <Typography variant="h6">Sign Up</Typography>
                </MenuItem>
              </>
            )}
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

        {loggedIn ? (
          <List>
            <ListItem button component={RouterLink} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={handleOpenPost}>
              <ListItemText primary="Create Post" />
            </ListItem>
            <ListItem component={RouterLink} to={`/users/${userState.user_id}`}>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              to="/"
              onClick={handleLogout}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        ) : (
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
        )}
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
        <div className={classes.modalContainer}>
          <Fade in={openPost}>
            <Post handleClosePost={handleClosePost} userState={userState} loaded={loaded} setLoaded={setLoaded}/>
          </Fade>
        </div>
      </Modal>
    </div>
  );
}
