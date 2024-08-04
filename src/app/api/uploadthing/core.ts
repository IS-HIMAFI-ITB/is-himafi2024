import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
// FileRouter for your app, can contain multiple FileRoutes
export const uploadthingFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      //!! This code RUNS ON YOUR SERVER after upload is complete
 
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { 
        // url: file.url 
        };
    }),
  blobUploader: f({blob: {maxFileSize: "4MB"}})
    .onUploadComplete(async ({ file }) => {
      //!! This code RUNS ON YOUR SERVER after upload is complete
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { 
        // url: file.url 
        };
    }),

  blobUploaderLarge: f({blob: {maxFileSize: "128MB"}})
    .onUploadComplete(async ({ file }) => {
      //!! This code RUNS ON YOUR SERVER after upload is complete
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { 
        // url: file.url 
        };
    })



} satisfies FileRouter;
 
export type uploadthingFileRouter = typeof uploadthingFileRouter;