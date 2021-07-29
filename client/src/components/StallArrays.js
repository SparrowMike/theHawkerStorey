import React from "react";
import {
  makeStyles,
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import { Link } from "react-router-dom";

//*=========this is stalls displayed in /v1/hawkers/:hawkercentre============

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "70%",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const StallArrays = ({ stall, index, centreName }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Link to={`/${centreName}/${stall.name}`}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={stall.image_url}
              title={stall.name}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom className={classes.text}>
                {stall.name}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </>
  );
};

export default StallArrays;
