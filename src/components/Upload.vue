<template>
    <div class="uw">
      <h3>Upload Widget Example</h3>
      <button v-on:click="open" id="upload_widget" class="cloudinary-button">
        Upload files
      </button>
      <p>
        <a
          href="https://cloudinary.com/documentation/upload_widget"
          target="_blank"
          >Upload Widget User Guide</a
        >
      </p>
      <p>
        <a
          href="https://cloudinary.com/documentation/upload_widget_reference"
          target="_blank"
          >Upload Widget Reference</a
        >
      </p>
      <img width="400" id="uploadedimage" src="" />
    </div>
  </template>
  
  <script setup>
  const cloudName = import.meta.env.VITE_CLOUD_NAME; // replace with your own cloud name
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET; // replace with your own upload preset  
  const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      // cropping: true, //add a cropping step
      // showAdvancedOptions: true,  //add advanced options (public_id and tag)
      // sources: [ "local", "url"], // restrict the upload sources to URL and local files
      // multiple: false,  //restrict upload to a single file
      // folder: "user_images", //upload files to the specified folder
      // tags: ["users", "profile"], //add the given tags to the uploaded files
      // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
      // clientAllowedFormats: ["images"], //restrict uploading to image files only
      // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
      // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      // theme: "purple", //change to a purple theme
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        document
          .getElementById("uploadedimage")
          .setAttribute("src", result.info.secure_url);
        console.log(result.info.secure_url);
      }
    }
  );
  
  function open() {
    myWidget.open();
  }
  </script>