
import { utapi } from "~/server/uploadthing";
import {any, z} from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";


export const backendRouter = createTRPCRouter({
    markOrphanedSubmissions:  publicProcedure.mutation(async({ ctx }) => {
        
        const  hiddenSubmissions = await ctx.db.submission.findMany({
            where: { hidden: true },
        });
        hiddenSubmissions.map((submission) => {
            if (submission.submissionKey !== null) {

                // UT API (uploadthing api) bug workaround, bad request if used with key instead of fileKey
                // @ts-expect-error: Unreachable code error
                void utapi.renameFiles({fileKey:submission.submissionKey, newName:".orphaned." + submission.filename,}) 

                console.log([{key: submission.submissionKey, url:"https://utfs.io/f/"+submission.submissionKey, newName:".orphaned." + submission.filename,}])
            }
        })
        // await utapi.renameFiles({
        //     key: "d108f9f0-db5a-479b-b754-148ebdcafc7d-hru0oc.ico",
        //     newName: "myImage.ico",
        //   });
      }),
  })
  