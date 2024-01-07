import dotenv from "dotenv";
dotenv.config();
const ENV = [
  "DB_HOST",
  "DB_PORT",
  "DB_NAME",

  "PORT",

  // payment (phonepe)
  "MERCHANT_ID",
  "PAYMENT_SALT_KEY",
  "MERCHANT_USER_ID",

  "BASE_URL",
] as const;

const loadVars = (env: readonly String[]): Record<string, string> => {
  const variables: Record<string, string> = {};

  env.forEach((name) => {
    const value = process.env[`${name}`];

    if (value) {
      variables[`${name}`] = value;
    } else {
      console.error(`Env ${name} not found`);
    }
  });

  return variables;
};

export const variables: Record<(typeof ENV)[number], string> = loadVars(ENV);
