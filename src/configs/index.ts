import dotenv from "dotenv";

dotenv.config();

const host = process.env.HOST || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

export default {
  host,
  port,
  hash: {
    iterations: process.env.PBKDF2_ITERATIONS,
    digest: process.env.PBKDF2_DIGEST,
    saltLength: process.env.PBKDF2_SALT_LENGTH,
    keyLength: process.env.PBKDF2_KEY_LENGTH,
  },
  db: {},
  logging: {},
};
