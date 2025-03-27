import express from "express";
import ExampleController from "../controllers/ExampleController";

const router = express.Router();

router.get("/", ExampleController.home);

export default router;
