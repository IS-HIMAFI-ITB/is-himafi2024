"use client";
 
import { UploadButton } from "~/utils/uploadthing";
 
export function ImageUpload() {
  
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res[0].url);

          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}