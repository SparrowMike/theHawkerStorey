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
    position: "relative",
    zIndex: "1",
  },
  image: {
    // backgroundImage:
    //   "url(https://www.visitsingapore.com/singapore-itineraries/singapore-food-paradise-a-three-day-guide/_jcr_content/par-carousel/carousel_detailpage/carousel/item0.thumbnail.carousel-img.740.416.jpg)",
    backgroundImage:
      "url(https://www.visitsingapore.com/editorials/did-you-know-foodies/_jcr_content.renderimage.carousel.rect.835.470.jpg) center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    opacity: "0.4",
    position: "absolute",
    zIndex: "-1",
    // top: "0",
    // bottom: "0",
    // left: "0",
    // right: "0",
    // background: url(test.jpg) center center;

    width: "100%",
    height: " 100%",
  },

  heroButtons: {
    marginTop: theme.spacing(4),
  },

  header: {
    color: theme.palette.common.white,
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.image} />
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
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
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
