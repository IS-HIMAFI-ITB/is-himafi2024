import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
   
  import type { uploadthingFileRouter } from "~/app/api/uploadthing/core";
   
  export const UploadButton = generateUploadButton<uploadthingFileRouter>();
  export const UploadDropzone = generateUploadDropzone<uploadthingFileRouter>();