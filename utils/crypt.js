import { genSalt, hash as genHash, compare as compareValue } from "bcryptjs";

export const hash = async (plainText) => {
  const salt = await genSalt(12);

  return await genHash(plainText, salt);
};

export const compare = async (plainText, hash) => {
  return compareValue(plainText, hash);
};
