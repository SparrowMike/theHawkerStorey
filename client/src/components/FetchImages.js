import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import {
  makeStyles,
  Grid,
  Card,
  Typography,
  Button,
  CardActions,
  CardContent,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    // paddingTop: "56.25%", // 16:9
    width: "100%",
    heigth: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

require("dotenv").config();

const FetchImages = () => {
  const classes = useStyles();

  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      console.log(data);
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("useeffect from fetchimages");
    loadImages();
  }, []);

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
          {imageIds &&
            imageIds.map((imageId, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <Image
                    className={classes.cardMedia}
                    key={index}
                    cloudName={"hawkerstorey"}
                    publicId={imageId}
                    // width="300"
                    crop="scale"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default FetchImages;
