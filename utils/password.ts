import bcrypt from "bcrypt";

export const getPasswordHash = async (password: string): Promise<string> => {
  const hashPassword = await bcrypt.hash(password, 10);

  return hashPassword;
};

export const validatePassword = async ({
  hashPassword,
  password,
}: {
  password: string;
  hashPassword: string;
}): Promise<boolean> => {
  const comparePassword = await bcrypt.compare(password, hashPassword);

  return comparePassword;
};
