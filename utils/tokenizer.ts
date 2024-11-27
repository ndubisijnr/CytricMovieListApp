"use server";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const generateToken = async (payload: { id: string; email: string }) => {
  if (!secret) {
    throw new Error("Missing secret key");
  }
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "360d",
  });

  return token;
};

export const decryptToken = async (token: string) => {
  if (!secret) {
    throw new Error("Missing secret key");
  }
  const decryptedData = jwt.verify(token, secret);

  return decryptedData;
};
