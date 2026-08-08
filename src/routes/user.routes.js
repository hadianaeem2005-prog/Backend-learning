import { Router } from "express";
import registerUser,{loginUser,getUserChannelProfile,getWatchHistory,updateCoverImageFile,updateAvatarFile,logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,updateAccountDetails} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";


const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },{
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

router.route("/loginUser").post(loginUser)

router.route("/logoutUser").post (verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").post(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateAvatarFile)
router.route("/cover-Image").patch(verifyJWT,upload.single("coverImage"),updateCoverImageFile)

router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/watch-history").get(verifyJWT,getWatchHistory)






export default router

