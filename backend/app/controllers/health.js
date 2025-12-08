const env = require("../config/env");

const getHealth = (req, res) => {
  return res.status(200).json({
    status: "ok",
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  getHealth,
};
