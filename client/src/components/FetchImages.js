import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
require("dotenv").config();

const FetchImages = () => {
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
    <div>
      <h1 className="title">Cloudinary Gallery</h1>
      <div className="gallery">
        {imageIds &&
          imageIds.map((imageId, index) => (
            <Image
              key={index}
              cloudName={"hawkerstorey"}
              publicId={imageId}
              width="300"
              crop="scale"
            />
          ))}
      </div>
    </div>
  );
};

export default FetchImages;
