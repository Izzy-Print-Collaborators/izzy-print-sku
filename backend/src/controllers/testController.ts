import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";

const testController = {
health: (req: Request, res: Response) => {
    return res.json({
      status: "ok",
      message: "API em TypeScript funcionando 🚀"
    });
  },
};

export default testController;
