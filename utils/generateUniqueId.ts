import { randomBytes } from "crypto";

export const generateUniqueId = () => {
  return randomBytes(16).toString("hex");
};
