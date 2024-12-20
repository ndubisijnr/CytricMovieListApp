import { decryptToken } from "@/utils/tokenizer";
import { getUserById } from "./user.controllers";

export const authenticateUser = async (headers: Headers) => {
  const token = headers.get("Authorization")?.split(" ")[1]; //gets authorization from request header

  console.log(token)
  // checks if token is in header
  if (!token) {
    return null;
  }

  const verifyToken = await decryptToken(token);

  if (!verifyToken) {
    return null;
  }

  const { id } = verifyToken as { id: string; email: string };
  const user = await getUserById(id);

  return user;
};
