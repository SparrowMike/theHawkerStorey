import React, { useState } from 'react'

//! DAVE TODOS:
//? check link with Mike dropzone
//? check post linkage to backend

const ImageUpload = ({ acceptedFiles }) => {
  // const URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`
  const URL = `https://api.cloudinary.com/v1_1/hawkerstorey/upload`

  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')

  const handleFile = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  // //* helper function to show user a preview of the image about to be submitted
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  // //* checks that there is an image when submit is clicked and uploads
  const handleSubmitFile = (e) => {
    console.log("submitting")
    e.preventDefault()
    if (!previewSource) return;
    uploadImage(previewSource);
  }

  const handleSubmitFile = (acceptedFiles) => {
    previewFile(acceptedFiles)
    console.log("submitting")
    if (!acceptedFiles) return;
    uploadImage(acceptedFiles);
  }

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage)
    try {
      await fetch('/api/upload', {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        header: { 'Content-type': 'application/json' }
      }

      )
    } catch (err) {
      console.log(err)
    }
  }

  // //! test upload via URL
  // // acceptedFiles.forEach(async (file) => {
  // const handleUpload = async (e, file) => {
  //   e.preventDefault()
  //   const formData = new FormData()
  //   formData.append("file", file)
  //   formData.append("upload_preset",
  //     process.env.CLOUDINARY_UPLOAD_PRESET
  //   )

  //   const response = await fetch(URL, {
  //     method: "post",
  //     body: formData
  //   });

  //   const data = await response.json()
  //   console.log(data)
  // }

  return (
    <>
      <h1>Upload Form</h1>
      <form onSubmit={(e) => handleUpload(e, acceptedFiles)}>
        <input type="file" name="image" onChange={handleFile} value={acceptedFiles} />
        <button type="submit">Submit</button>
      </form>
      {
        previewSource && (
          <img src={previewSource}
            alt="chosen image"
            style={{ height: "300px" }} />
        )
      }
    </>
  )
}


export default ImageUpload
