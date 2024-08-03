import { createRouteHandler } from "uploadthing/next";
 
import { uploadthingFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: uploadthingFileRouter,
 
  // Apply an (optional) custom config:
  // config: { ... },
});