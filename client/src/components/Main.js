import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FetchImages from "./FetchImages";

import MainAutocompleteHC from "./MainAutcompleteHC";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },

  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    backgroundImage:
      " linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url(https://www.visitsingapore.com/editorials/did-you-know-foodies/_jcr_content.renderimage.carousel.rect.835.470.jpg)",
    // " linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)",
    // " linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url(https://www.visitsingapore.com/singapore-itineraries/singapore-food-paradise-a-three-day-guide/_jcr_content/par-carousel/carousel_detailpage/carousel/item0.thumbnail.carousel-img.740.416.jpg)",

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  heroButtons: {
    marginTop: theme.spacing(4),
    color: theme.palette.common.white,
  },

  header: {
    color: theme.palette.common.black,
    fontSize: "32px",
    fontWeight: "500",
    textShadow: "rgba(255,255,255,0.5) 0px 3px 3px",
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              className={classes.header}
              gutterBottom
            >
              view a story, within our hawker storey
            </Typography>
            <Typography
              variant="h1"
              align="center"
              className={classes.header}
            ></Typography>
            <MainAutocompleteHC />
          </Container>
        </div>
        <FetchImages />
      </main>
    </React.Fragment>
  );
}
