import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";

const userController = {
// GET /users
user: async (req: Request, res: Response) => {
    const users = await UserRepository.findAll();

    // remove password da resposta
    const safeUsers = users.map(({ password, ...rest }) => rest);

    return res.json(safeUsers);
  },


  // POST /users
  createUser: async (req: Request, res: Response) => {
    const { name, password, admin } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ error: "Name e password são obrigatórios" });
    }

    const user = await UserRepository.create({
      name,
      password,
      admin
    });

    const { password: _, ...safeUser } = user;
    return res.status(201).json(safeUser);
  }
};

export default userController;
