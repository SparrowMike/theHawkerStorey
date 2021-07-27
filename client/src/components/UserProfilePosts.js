import React from 'react'
import {
  makeStyles,
  Grid,
  Card,
  Typography,
  CardContent,
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



const UserProfilePosts = ({post}) => {
  const classes = useStyles()
  return (
    <>
    <Grid item xs={12} sm={6} md={4}>
    
    <Card className={classes.card}> 
    {/*=====   add link to posts modal/page =======*/}
    <img src={post.image_url} alt="user post image" />
    <CardContent className={classes.cardContent}>
    <Typography gutterBottom variant="body">
    {post.review}
    </Typography>
    </CardContent>
    </Card>
    </Grid>
    </>
  )
}

export default UserProfilePosts
