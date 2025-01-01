import express from "express";
import { saveAddress, getSavedAddresses, deleteAddress } from "../controllers/addressController.js";
import { registerUser, loginUser } from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router();

// User Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Address Routes
userRouter.post("/address/save", userAuth, saveAddress);
userRouter.post("/address/list", userAuth, getSavedAddresses);
userRouter.delete("/address/delete", userAuth, deleteAddress );


export default userRouter;
