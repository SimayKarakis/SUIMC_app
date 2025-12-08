const dotenv = require("dotenv");
dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || "dev-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};

module.exports = env;