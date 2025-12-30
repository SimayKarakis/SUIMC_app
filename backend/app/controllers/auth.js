// controllers/auth.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/env");

const prisma = new PrismaClient();

// used the same for seed data
const SALT_ROUNDS = 2 ** 12;

// used in Authorization: Bearer <token>
function generateAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      userLevel: user.userLevel,
      firstname: user.firstname,
      lastname: user.lastname,
      tokenVersion: user.tokenVersion,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn } // e.g. "1d"
  );
}

// used to get new access token
function generateRefreshToken(user) {
  // If you later add REFRESH secret / expiry to env, you can plug it here.
  const refreshSecret = env.jwtSecret; // simple version: same secret
  const refreshExpiresIn = "7d";       // or env.jwtRefreshExpiresIn

  return jwt.sign(
    {
      sub: user.id,
      tokenVersion: user.tokenVersion,
    },
    refreshSecret,
    { expiresIn: refreshExpiresIn }
  );
}

// strip password before sending to client
function serializeUser(user) {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
}

// POST /api/auth/register
// body: { username, password, firstName, lastName, primaryEmail, secondaryEmail?, userLevel? }
async function register(req, res, next) {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      primaryEmail,
      secondaryEmail,
      userLevel,
    } = req.body;

    if (!username || !password || !firstName || !lastName || !primaryEmail) {
      return res.status(400).json({
        message: "username, password, firstName, lastName, primaryEmail are required",
      });
    }

    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (existing) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createdUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        firstname: firstName,
        lastname: lastName,
        email1: primaryEmail,
        email2: secondaryEmail ?? null,
        userLevel: userLevel || "LAB_SPECIALIST", // default, adjust if you have other roles
      },
    });

    const accessToken = generateAccessToken(createdUser);
    const refreshToken = generateRefreshToken(createdUser);

    return res.status(201).json({
      user: serializeUser(createdUser),
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
// body: { username, password }
async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(200).json({
      user: serializeUser(user),
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/refresh
// body: { refreshToken }
async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "refreshToken is required" });
    }

    const refreshSecret = env.jwtSecret; // same as above

    let payload;
    try {
      payload = jwt.verify(refreshToken, refreshSecret);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.status(401).json({ message: "Refresh token has been revoked" });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    return res.status(200).json({
      user: serializeUser(user),
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me   (protected)
async function me(req, res, next) {
  try {
    // req.user is set by auth middleware
    const authUser = req.user;
    if (!authUser || !authUser.sub) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await prisma.user.findUnique({
      where: { id: authUser.sub },
    });

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    return res.status(200).json({
      user: serializeUser(user),
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/logout
async function logout(req, res, next) {
  try {
    const authUser = req.user;
    if (!authUser || !authUser.sub) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    await prisma.user.update({
      where: { id: authUser.sub },
      data: {
        tokenVersion: {
          increment: 1,
        },
      },
    });

    return res.status(200).json({
      message: "Logged out. All existing tokens have been revoked.",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  refreshToken,
  me,
  logout,
};
