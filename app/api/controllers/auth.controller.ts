import { decryptToken } from "@/utils/tokenizer";
import { getUserByEmail } from "./user.controllers";

export const authenticateUser = async (accessToken: string) => {
  const verifyToken = await decryptToken(accessToken.split(" ")[1]);

  if (!verifyToken) {
    return null;
  }

  const { email } = verifyToken as { id: string; email: string };
  const user = await getUserByEmail(email);

  return user;
};
