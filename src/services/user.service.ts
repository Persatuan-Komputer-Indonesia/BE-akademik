import { UserRepository } from "../repository/user.repository";
import bcrypt from "bcrypt";

export const UserService = {
  // CREATE
  async create(data: {
    username: string;
    email: string;
    password: string;
    role: "ADMIN" | "USER";
  }) {
    if (!data.email.includes("@"))
      throw new Error("Email invalid bre!");
    if (data.password.length < 6)
      throw new Error("Password minimal 6 karakter bre!");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return UserRepository.create({
      ...data,
      password: hashedPassword,
    });
  },

  // GET ALL
  async findAll(page: number = 1, limit: number = 10) {
    const [users, total] = await UserRepository.findAll(page, limit);
  
    return {
      data: users,
      meta: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit,
      },
    };
  },
  // GET BY ID
  async findById(id: string) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error("User tidak ditemukan bre!");
    return user;
  },

  // GET BY EMAIL (LOGIN)
  async findByEmail(email: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("User tidak ditemukan bre!");
    return user;
  },

  // UPDATE
  async update(
    id: string,
    data: Partial<{
      username: string;
      email: string;
      password: string;
      role: "ADMIN" | "USER";
    }>
  ) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error("User tidak ditemukan bre!");

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return UserRepository.update(id, data);
  },

  // SOFT DELETE
  async delete(id: string) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error("User tidak ditemukan bre!");
    return UserRepository.delete(id);
  },

  // LOGIN
async login(email: string, password: string) {
  const user = await UserRepository.findByEmail(email);
  if (!user) throw new Error("Email ga terdaftar bre!");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Password salah bre!");

  return user;
}
};
