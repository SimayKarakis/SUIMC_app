// middlewares/auth.js
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const env = require("../config/env");

const prisma = new PrismaClient();

// checks Authorization: Bearer <accessToken>
async function authenticate(req, res, next) {
  // Express normalizes headers to lowercase
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or invalid" });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = jwt.verify(token, env.jwtSecret);

    // Fetch user and verify tokenVersion
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.status(401).json({
        message: "Token has been revoked. Please log in again.",
      });
    }

    // Attach verified user info to request
    req.user = {
      ...payload,
      tokenVersion: user.tokenVersion,
    };

    next();
  } catch (err) {
    // Log the actual error for debugging
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = {
  authenticate,
};