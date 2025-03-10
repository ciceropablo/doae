import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../plugins/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function register(name: string, email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "USER", // Sempre força para USER no fluxo público
    },
  });

  return { user };
}

export async function login(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    console.warn(`Invalid login attempt for email ${email}`); // Loga falha (opcional)
    throw new Error("Invalid email or password");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    console.warn(`Invalid login attempt for email ${email}`); // Loga falha (opcional)
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { user, token };
}
