import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { Container, makeStyles } from "@material-ui/core";

import StackGrid, { transitions } from "react-stack-grid";

// const { scaleDown } = transitions;

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
  },
  cardMedia: {
    padding: "10px",
    width: "100%",
    heigth: "100%",
    "&:hover": {
      // boxShadow: "0 0 1px 1px #9d0208 inset",
      // transform: "scale(1.09)",
      boxShadow: "11 11 11px blacknpm",

      // boxShadow: "0 0.6em 0.5em -0.4em salmon",
      // transform: "translateY(-0.15em)",
      cursor: "pointer",
    },
  },

  stackGrid: {
    padding: "40px",
  },
}));

require("dotenv").config();

const FetchImages = () => {
  const classes = useStyles();

  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch("/images");
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
      <Container className={classes.container}>
        <StackGrid columnWidth={400} className={classes.stackGrid}>
          {imageIds &&
            imageIds.map((imageId, index) => (
              <Image
                className={classes.cardMedia}
                key={index}
                cloudName={"hawkerstorey"}
                publicId={imageId}
                // width="300"
                crop="scale"
              />
            ))}
        </StackGrid>
      </Container>
    </>
  );
};

export default FetchImages;
