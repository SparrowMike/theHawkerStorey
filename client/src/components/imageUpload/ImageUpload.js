import React, { useState } from 'react'

const ImageUpload = (acceptedFiles) => {
  const URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`

  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')
  const [selectedFile, setSelectedFile] = useState('')

  const handleFile = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  //* helper function to show user a preview of the image about to be submitted
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  //* checks that there is an image when submit is clicked and uploads
  const handleSubmitFile = (e) => {
    console.log("submitting")
    e.preventDefault()
    if (!previewSource) return;
    uploadImage(previewSource);
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


  // file.forEach(async (acceptedFile) => {

  //   const formData = new FormData()
  //   formData.append("file", acceptedFile)
  //   formData.append("upload_preset",
  //     process.env.CLOUDINARY_UPLOAD_PRESET
  //   )

  //   const response = await fetch(URL, {
  //     method: "post",
  //     body: formData
  //   });

  //   const data = await response.json()
  //   console.log(data)
  // })

  return (
    <>
      <h1>Upload Form</h1>
      <form onSubmit={handleSubmitFile}>
        <input type="file" name="image" onChange={handleFile} value={fileInputState} />
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
