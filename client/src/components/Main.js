import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FetchImages from "./FetchImages";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },

  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    backgroundImage:
      // " linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url(https://www.visitsingapore.com/editorials/did-you-know-foodies/_jcr_content.renderimage.carousel.rect.835.470.jpg)",
      // " linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)",
      " linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url(https://www.visitsingapore.com/singapore-itineraries/singapore-food-paradise-a-three-day-guide/_jcr_content/par-carousel/carousel_detailpage/carousel/item0.thumbnail.carousel-img.740.416.jpg)",

    //* alternative picture

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  heroButtons: {
    marginTop: theme.spacing(4),
    color: theme.palette.common.white,
  },

  header: {
    color: theme.palette.common.white,
    textShadow: theme.shadows[10],
  },

  button: {
    // color: theme.palette.primary,
    // background: theme.palette.secondary,
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
              // className={classes.header}
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              // className={classes.header}
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" className={classes.button}>
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" className={classes.button}>
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <FetchImages />
      </main>
    </React.Fragment>
  );
}
