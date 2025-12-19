import { Router } from "express";
import testController from "../controllers/testController";
import userController from "../controllers/userController";

const router = Router();

router.get("/health", testController.health);
router.get("/users", userController.getUsers);
router.post("/user", userController.createUser);

export default router;
