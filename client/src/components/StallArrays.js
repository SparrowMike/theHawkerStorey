import React from "react";
import {
  makeStyles,
  Grid,
  Card,
  Typography,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Container,
} from "@material-ui/core";
{/* =========this is stalls displayed in /v1/hawkers/:hawkercentre============ */}

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


const StallArrays = ({stall, index}) => {
  const classes = useStyles()
  return(
    <>
    <Grid item key={index} xs={12} sm={6} md={4}>
    {/* <Image
        className={classes.cardMedia}
        src= {stall.image_url}
        crop="scale"
    /> */}
    <Card className={classes.card}>
    {/* <CardMedia
    className={classes.cardMedia}
    image= {stall.image_url}
    title={stall.name} /> */}
    <img src={stall.image_url} alt={stall.name} />
    <CardContent className={classes.cardContent}>
    <Typography gutterBottom variant="h5" component="h2">
    {stall.name}
    </Typography>
    </CardContent>
   </Card>
    </Grid>
    </>
  )
}

export default StallArrays;