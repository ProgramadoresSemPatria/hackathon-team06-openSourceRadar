import { Request, Response } from "express";

class ExampleController {
  async home(req: Request, res: Response) {
    return res.status(200).json({
      message: "API working!",
    });
  }
}

export default new ExampleController();
