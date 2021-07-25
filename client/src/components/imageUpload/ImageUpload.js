import React, { useState } from 'react'

//! DAVE TODOS:
//? check link with Mike dropzone
//? check post linkage to backend

const ImageUpload = ({ acceptedFiles }) => {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  //* this function sets the state to the image the user wants to upload
  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
    setSelectedFile(file)
    console.log(file, e.target.value)
    setFileInputState(e.target.value)
  }

  //* helper function to show user a preview of the image about to be submitted. 
  //! can remove when we transfer to form submitcan remove when mike code is linked to this
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  //* checks that there is an image when submit is clicked and uploads. 
  //! to transfer this to form submit button when ready
  const handleSubmitFile = (e) => {
    e.preventDefault()
    console.log("submitting")
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile)
    reader.onloadend = () => {
      uploadImage(reader.result);
    }
    reader.onerror = () => {
      console.error("Something went wrong")
    }
  }

  //* convert image binary into string (base64EndcodedImage) and calls fetch route
  //! to change fetch route to post controller route when we move code from server.js to posts
  const uploadImage = async (base64EncodedImage) => {
    console.log("Attempting upload - ", base64EncodedImage)
    try {
      await fetch('/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
      });
      setFileInputState('');
      setPreviewSource('');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <h1>Upload an Image</h1>
      <form onSubmit={handleSubmitFile}>
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
        />
        <button type="submit">Submit</button>
      </form>
      {
        previewSource && (
          <img src={previewSource}
            alt="chosen"
            style={{ height: "300px" }} />
        )
      }
    </>
  )
}


export default ImageUpload
