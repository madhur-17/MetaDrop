import {Router} from "express";
import authRoute from "./authRoutes";
import spaceRoute from"./spaceRoutes";
import userRoute from "./userRoutes";
import adminRoutes from "./adminRotes";

const router=Router();
router.use("/auth",authRoute);
router.use("/user",userRoute);
router.use("/admin",adminRoutes);
router.use("/space",spaceRoute);


export default router;