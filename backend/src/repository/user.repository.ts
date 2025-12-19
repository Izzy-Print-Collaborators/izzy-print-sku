import prisma from "../lib/prisma";
import { User } from "@prisma/client";

class UserRepository {
async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  async findByName(name: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { name }
    });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async create(data: {
    name: string;
    admin?: boolean;
  }): Promise<User> {
    return prisma.user.create({
      data
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id }
    });
  }
}

export default new UserRepository();
