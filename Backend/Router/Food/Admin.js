import express from "express";
import * as SACACFun from "../../Controller/Food/Admin.js";
import { AddManager } from "../../Controller/Education/Admin.js";
// SACACFun => SCHOOL AND COLLEGE ADMIN CONTROLLER FUNCTIONS:
import { AdminMW } from "../../Middleware/AdminMW.js";
import { upload } from "../../Middleware/multer.js";
import { DeleteStaffImage } from "../../utils/cloudinary.js";

const foodAdminRoutes = express.Router();

foodAdminRoutes.post("/food/AddManager", AdminMW, AddManager);
foodAdminRoutes.post("/UpdateFoodMenu", AdminMW, SACACFun.UpdateFoodMenuToDb);
foodAdminRoutes.post("/SubmitSupportTicket", AdminMW, SACACFun.SubmitSupportTicket);
foodAdminRoutes.post("/food/report/status", AdminMW, SACACFun.UpdateReportStatus);
foodAdminRoutes.post("/UpdateFoodPromos", AdminMW, SACACFun.UpdateFoodPromotions);
foodAdminRoutes.post("/UpdateFoodGallery", AdminMW, upload.array("galleryImages", 10), SACACFun.UpdateFoodGallery);
foodAdminRoutes.post("/UpdateTimings", AdminMW, SACACFun.UpdateTimingsToDb);
foodAdminRoutes.put("/update-cover-image", AdminMW, upload.single("coverImage"), SACACFun.UpdateCoverImage);
foodAdminRoutes.post("/ReplyToReview", AdminMW, SACACFun.ReplyToReview);
foodAdminRoutes.post("/food/UpdatePaymentSettings", AdminMW, SACACFun.UpdatePaymentSettings);

export default foodAdminRoutes;
