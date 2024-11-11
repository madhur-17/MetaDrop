import {Router} from "express";
import authRoute from "./authRoutes";

const router=Router();
router.use("/auth",authRoute)


export default router;