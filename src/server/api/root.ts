import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

import { tugasAdminRouter } from "~/server/api/routers/tugas-admin";
import { postAdminRouter } from "~/server/api/routers/post-admin";
import { userRouter } from "~/server/api/routers/user";
import { submitPesertaRouter } from "./routers/submit-peserta";
import { backendRouter } from "./routers/backend";
import { perizinanRouter } from "./routers/perizinan";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tugasAdmin: tugasAdminRouter,
  postAdmin: postAdminRouter,
  user: userRouter,
  submitPeserta: submitPesertaRouter,
  backend: backendRouter,
  perizinan: perizinanRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
